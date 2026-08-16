import { fetchWeatherApi } from "openmeteo";

export type CurrentWeather = {
  time: Date;
  temperature: number;
  humidity: number;
  precipitation: number;
  apparentTemperature: number;
  windSpeed: number;
  weatherCode: number;
};

export type HourlyWeather = {
  time: Date[];
  temperature: number[];
  weatherCode: number[];
};

export type DailyWeather = {
  time: Date[];
  temperatureMax: number[];
  temperatureMin: number[];
  weatherCode: number[];
};

export type WeatherData = {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
};

// The openmeteo SDK exposes variables only by index. The response order matches
// the `current`/`hourly`/`daily` param strings above:
//   current: temperature_2m, relative_humidity_2m, precipitation,
//            apparent_temperature, wind_speed_10m, weather_code
//   hourly:  temperature_2m, weather_code
//   daily:   weather_code, temperature_2m_max, temperature_2m_min
// Note: daily max/min cannot be resolved by name — the flatbuffer encodes both
// as `Variable.temperature` — so named lookups are not possible here.
export async function fetchWeatherData(
  latitude: number,
  longitude: number,
): Promise<WeatherData> {
  const params = {
    latitude: latitude,
    longitude: longitude,
    current:
      "temperature_2m,relative_humidity_2m,precipitation,apparent_temperature,wind_speed_10m,weather_code",
    hourly: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  // helper
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  return {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature: current.variables(0)!.value(),
      humidity: current.variables(1)!.value(),
      precipitation: current.variables(2)!.value(),
      apparentTemperature: current.variables(3)!.value(),
      windSpeed: current.variables(4)!.value(),
      weatherCode: current.variables(5)!.value(),
    },
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),

      temperature: Array.from(hourly.variables(0)!.valuesArray()!),
      weatherCode: Array.from(hourly.variables(1)!.valuesArray()!),
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),

      temperatureMax: Array.from(daily.variables(1)!.valuesArray()!),
      temperatureMin: Array.from(daily.variables(2)!.valuesArray()!),
      weatherCode: Array.from(daily.variables(0)!.valuesArray()!),
    },
  };
}
