"use client";

import { usePreferencesStore } from "@/store";
import { convert } from "@/utils";
import DailyForecastDay from "../DailyForecastDay/DailyForecastDay";
import Skeleton from "../Skeleton/Skeleton";

import styles from "./DailyForecastContainer.module.css";
import { type DailyWeather } from "@/services";

export default function DailyForecastContainer({
  dailyWeatherData,
}: {
  dailyWeatherData?: DailyWeather;
}) {
  const isCelsius = usePreferencesStore((state) => state.temperature.isCelsius);

  const formatTemp = (celsius: number) =>
    isCelsius ? celsius.toFixed() : convert.temp.toF(celsius);

  return (
    <section className={styles.container} aria-labelledby="daily-forecast-heading">
      <h2 id="daily-forecast-heading">Daily Forecast</h2>
      <div className={styles.days_container}>
        {dailyWeatherData
          ? dailyWeatherData.time.map((date, index) => (
              <DailyForecastDay
                key={index}
                day={date.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
                temperatureMax={`${formatTemp(
                  dailyWeatherData.temperatureMax[index],
                )}°`}
                temperatureMin={`${formatTemp(
                  dailyWeatherData.temperatureMin[index],
                )}°`}
                weatherCode={dailyWeatherData.weatherCode[index]}
              />
            ))
          : Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className={styles.daySkeleton}>
                <Skeleton className={styles.dayLine} />
                <Skeleton className={styles.iconSkeleton} />
                <div className={styles.tempLines}>
                  <Skeleton className={styles.tempLine} />
                  <Skeleton className={styles.tempLine} />
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
