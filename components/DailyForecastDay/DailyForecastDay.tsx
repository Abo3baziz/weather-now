import Image from "next/image";

import styles from "./DailyForecastDay.module.css";

import { getWeatherIcon } from "@/utils";

type DailyForecastTypes = {
  day?: string;
  temperatureMin?: string;
  temperatureMax?: string;
  weatherCode?: number;
};

export default function DailyForecastDay({
  day,
  temperatureMin,
  temperatureMax,
  weatherCode,
}: DailyForecastTypes) {
  return (
    <div className={styles.card}>
      <p>{day}</p>
      <Image
        src={getWeatherIcon(weatherCode)}
        alt="forecast weather condition"
        width={50}
        height={50}
      />
      <div className={styles.temperature_box}>
        <p>{temperatureMax}</p>
        <p>{temperatureMin}</p>
      </div>
    </div>
  );
}
