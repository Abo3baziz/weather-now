import { fetchWeatherApi } from "openmeteo";

export async function fetchWeatherData(latitude: number, longitude: number) {
  const params = {
    latitude: latitude,
    longitude: longitude,
    current: "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m",
    hourly: "temperature_2m",
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

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature: current.variables(0)!.value(),
      humidity: current.variables(1)!.value(),
      precipitation: current.variables(2)!.value(),
      windSpeed: current.variables(3)!.value(),
    },
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),

      temperature: Array.from(hourly.variables(0)!.valuesArray()!),
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),

      temperatureMax: Array.from(daily.variables(1)!.valuesArray()!),
      temperatureMin: Array.from(daily.variables(2)!.valuesArray()!),
    },
  };

  return weatherData;
}
