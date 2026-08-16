"use client";

import styles from "./CurrentWeatherContainer.module.css";

import SmallWidget from "../SmallWidget/SmallWidget";
import CurrentWidget from "../CurrentWidget/CurrentWidget";

import { useLocationStore, usePreferencesStore } from "@/store";
import { convert } from "@/utils";
import { type CurrentWeather } from "@/services";

export default function CurrentWeatherContainer({
  currentWeatherData,
}: {
  currentWeatherData: CurrentWeather;
}) {
  const locationState = useLocationStore((state) => state.location);

  const isCelsius = usePreferencesStore((state) => state.temperature.isCelsius);
  const isKm = usePreferencesStore((state) => state.windSpeed.isKm);
  const isMm = usePreferencesStore((state) => state.precipitation.isMm);

  const formatTemp = (celsius: number) =>
    isCelsius ? celsius.toFixed() : convert.temp.toF(celsius);

  return (
    <div className={styles.container}>
      <CurrentWidget
        country={locationState.country ?? ""}
        name={locationState.name ?? ""}
        temperature={formatTemp(currentWeatherData.temperature)}
        weatherCode={currentWeatherData.weatherCode}
      />
      <div className={styles.smallWidgetContainer}>
        <SmallWidget
          property="Feels Like"
          value={`${formatTemp(currentWeatherData.apparentTemperature)}°`}
        />
        <SmallWidget
          property="Humidity"
          value={`${currentWeatherData.humidity}%`}
        />
        <SmallWidget
          property="Wind"
          value={
            isKm
              ? `${currentWeatherData.windSpeed.toFixed()} Km/h`
              : `${convert.speed.toMph(currentWeatherData.windSpeed)} mph`
          }
        />
        <SmallWidget
          property="Precipitation"
          value={
            isMm
              ? `${currentWeatherData.precipitation} mm`
              : `${convert.length.mmToInch(currentWeatherData.precipitation)} in`
          }
        />
      </div>
    </div>
  );
}
