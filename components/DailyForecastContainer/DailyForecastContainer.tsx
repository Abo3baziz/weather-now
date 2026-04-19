"use client";

import { usePreferencesStore } from "@/store/preferences.store";
import { convert } from "@/utils/unitConverting";
import DailyForecastDay from "../DailyForecastDay/DailyForecastDay";

import styles from "./DailyForecastContainer.module.css";

type DailyWeatherDataTypes = {
  temperatureMax: number[];
  temperatureMin: number[];
  time: Date[];
};

export default function DailyForecastContainer({
  dailyWeatherData,
}: {
  dailyWeatherData: DailyWeatherDataTypes;
}) {
  const isCelsius = usePreferencesStore((state) => state.temperature.isCelsius);

  function mapDailyTemps({
    temperatureMax = [],
    temperatureMin = [],
    time = [],
  }: Partial<DailyWeatherDataTypes> = {}) {
    return time.map((date, i) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      max: temperatureMax[i],
      min: temperatureMin[i],
    }));
  }

  const daily = dailyWeatherData ?? {
    temperatureMax: [],
    temperatureMin: [],
    time: [],
  };

  const result = mapDailyTemps(daily);

  return (
    <section className={styles.container}>
      <p>Daily Forecast</p>
      <div className={styles.days_container}>
        {result.map((dayData, index) => (
          <DailyForecastDay
            key={index}
            day={dayData.date}
            temperatureMax={
              dayData.max && isCelsius
                ? dayData.max.toFixed() + "°"
                : convert.temp.toF(dayData.max) + "°"
            }
            temperatureMin={
              dayData.min && isCelsius
                ? dayData.min.toFixed() + "°"
                : convert.temp.toF(dayData.min) + "°"
            }
          />
        ))}
      </div>
    </section>
  );
}
