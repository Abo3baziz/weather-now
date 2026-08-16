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
