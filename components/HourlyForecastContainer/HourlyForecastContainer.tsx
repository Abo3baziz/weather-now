"use client";

import styles from "./HourlyForecastContainer.module.css";

import OneHourForecast from "../OneHourForecast/OneHourForecast";
import SelectDay from "../SelectDay/SelectDay";

import { type HourlyWeather } from "@/services";

import { useState } from "react";

function groupHoursByDay(hourly: HourlyWeather): HourlyWeather[] {
  const groups = new Map<string, HourlyWeather>();

  hourly.time.forEach((date, index) => {
    const key = date.toDateString();
    const group =
      groups.get(key) ?? { time: [], temperature: [], weatherCode: [] };

    group.time.push(date);
    group.temperature.push(hourly.temperature[index]);
    group.weatherCode.push(hourly.weatherCode[index]);

    groups.set(key, group);
  });

  return Array.from(groups.values());
}

export default function HourlyForecastContainer({
  hourlyWeatherData,
}: {
  hourlyWeatherData: HourlyWeather;
}) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const days = groupHoursByDay(hourlyWeatherData);
  const safeActiveIndex = Math.min(activeDayIndex, days.length - 1);
  const activeDay = days[safeActiveIndex];

  if (!activeDay) {
    return null;
  }

  return (
    <section className={styles.hourlyForecast} aria-labelledby="hourly-forecast-heading">
      <div className={styles.header}>
        <h2 id="hourly-forecast-heading">Hourly forecast</h2>

        <SelectDay
          days={days.map((day) =>
            day.time[0].toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            }),
          )}
          value={safeActiveIndex}
          onChange={setActiveDayIndex}
        />
      </div>
      <div className={styles.hourlyForecast_body}>
        {activeDay.time.map((time, index) => (
          <OneHourForecast
            key={index}
            time={time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            temperature={activeDay.temperature[index] ?? 0}
            weatherCode={activeDay.weatherCode[index]}
          />
        ))}
      </div>
    </section>
  );
}
