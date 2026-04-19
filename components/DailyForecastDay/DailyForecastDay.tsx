import Image from "next/image";

import styles from "./DailyForecastDay.module.css";

import icon from "@/public/images/icon-fog.webp";

type DailyForecastTypes = {
  day?: string;
  temperatureMin?: string;
  temperatureMax?: string;
};

export default function DailyForecastDay({
  day,
  temperatureMin,
  temperatureMax,
}: DailyForecastTypes) {
  return (
    <div className={styles.card}>
      <p>{day}</p>
      {/* TODO render Custom icon based on weather condition*/}
      <Image src={icon} alt="icon" width={50} />
      <div className={styles.temperature_box}>
        <p>{temperatureMax}</p>
        <p>{temperatureMin}</p>
      </div>
    </div>
  );
}
