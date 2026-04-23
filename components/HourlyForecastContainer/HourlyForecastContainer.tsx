import styles from "./HourlyForecastContainer.module.css";

import OneHourForecast from "../OneHourForecast.tsx/OneHourForecast";
import SelectDay from "../SelectDay/SelectDay";

type HourlyWeatherDataTypes = {
  time: Date[];
  temperature: number[];
};

export default function HourlyForecastContainer({
  hourlyWeatherData,
}: {
  hourlyWeatherData: HourlyWeatherDataTypes;
}) {
  const hours = hourlyWeatherData.time.slice(0, 24);

  return (
    <>
      <section className={styles.hourlyForecast}>
        <div className={styles.header}>
          <p>Hourly forecast</p>

          <SelectDay />
        </div>
        <div className={styles.hourlyForecast_body}>
          {hours.map((_hour, index) => (
            <OneHourForecast
              key={index}
              time={_hour.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              temperature={hourlyWeatherData.temperature[index] ?? 0}
            />
          ))}
        </div>
      </section>
    </>
  );
}
