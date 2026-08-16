const weatherCodeToIcon: Record<number, string> = {
  0: "/images/icon-sunny.webp",
  1: "/images/icon-sunny.webp",
  2: "/images/icon-partly-cloudy.webp",
  3: "/images/icon-overcast.webp",
  45: "/images/icon-fog.webp",
  48: "/images/icon-fog.webp",
  51: "/images/icon-drizzle.webp",
  53: "/images/icon-drizzle.webp",
  55: "/images/icon-drizzle.webp",
  56: "/images/icon-drizzle.webp",
  57: "/images/icon-drizzle.webp",
  61: "/images/icon-rain.webp",
  63: "/images/icon-rain.webp",
  65: "/images/icon-rain.webp",
  66: "/images/icon-rain.webp",
  67: "/images/icon-rain.webp",
  71: "/images/icon-snow.webp",
  73: "/images/icon-snow.webp",
  75: "/images/icon-snow.webp",
  77: "/images/icon-snow.webp",
  80: "/images/icon-rain.webp",
  81: "/images/icon-rain.webp",
  82: "/images/icon-storm.webp",
  85: "/images/icon-snow.webp",
  86: "/images/icon-snow.webp",
  95: "/images/icon-storm.webp",
  96: "/images/icon-storm.webp",
  99: "/images/icon-storm.webp",
};

export function getWeatherIcon(weatherCode?: number): string {
  return weatherCodeToIcon[weatherCode ?? 0] ?? "/images/icon-sunny.webp";
}

const weatherCodeToDescription: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Drizzle",
  53: "Drizzle",
  55: "Drizzle",
  56: "Freezing drizzle",
  57: "Freezing drizzle",
  61: "Rain",
  63: "Rain",
  65: "Rain",
  66: "Freezing rain",
  67: "Freezing rain",
  71: "Snow",
  73: "Snow",
  75: "Snow",
  77: "Snow grains",
  80: "Rain showers",
  81: "Rain showers",
  82: "Rain showers",
  85: "Snow showers",
  86: "Snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with hail",
};

export function getWeatherDescription(weatherCode?: number): string {
  return weatherCodeToDescription[weatherCode ?? 0] ?? "Weather";
}
