"use client";

import Image from "next/image";

import styles from "./OneHourForecast.module.css";

import { convert, getWeatherIcon } from "@/utils";
import { usePreferencesStore } from "@/store";

type OneHourForecastTypes = {
  temperature: number;
  time: string;
  weatherCode?: number;
};

export default function OneHourForecast({
  temperature,
  time,
  weatherCode,
}: OneHourForecastTypes) {
  const isCelsius = usePreferencesStore((state) => state.temperature.isCelsius);

  const formattedTemperature = isCelsius
    ? temperature.toFixed() + "°"
    : convert.temp.toF(temperature) + "°";

  return (
    <div className={styles.OneHourForecast}>
      <div>
        <Image
          src={getWeatherIcon(weatherCode)}
          alt="hourly weather condition"
          width={30}
          height={30}
        />
        <p>{time}</p>
      </div>

      <p>{formattedTemperature}</p>
    </div>
  );
}
