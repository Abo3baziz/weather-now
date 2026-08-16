"use client";

import { usePreferencesStore } from "@/store";
import { convert } from "@/utils";
import DailyForecastDay from "../DailyForecastDay/DailyForecastDay";

import styles from "./DailyForecastContainer.module.css";
import { type DailyWeather } from "@/services";

export default function DailyForecastContainer({
  dailyWeatherData,
}: {
  dailyWeatherData: DailyWeather;
}) {
  const isCelsius = usePreferencesStore((state) => state.temperature.isCelsius);

  const daily = dailyWeatherData ?? {
    temperatureMax: [],
    temperatureMin: [],
    weatherCode: [],
    time: [],
  };

  const formatTemp = (celsius: number) =>
    isCelsius ? celsius.toFixed() : convert.temp.toF(celsius);

  return (
    <section className={styles.container} aria-labelledby="daily-forecast-heading">
      <h2 id="daily-forecast-heading">Daily Forecast</h2>
      <div className={styles.days_container}>
        {daily.time.map((date, index) => (
          <DailyForecastDay
            key={index}
            day={date.toLocaleDateString("en-US", {
              weekday: "short",
            })}
            temperatureMax={`${formatTemp(daily.temperatureMax[index])}°`}
            temperatureMin={`${formatTemp(daily.temperatureMin[index])}°`}
            weatherCode={daily.weatherCode[index]}
          />
        ))}
      </div>
    </section>
  );
}
