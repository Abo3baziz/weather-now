"use client";

import styles from "./CurrentWeatherContainer.module.css";

import SmallWidget from "../SmallWidget/SmallWidget";
import CurrentWidget from "../CurrentWidget/CurrentWidget";
import Skeleton from "../Skeleton/Skeleton";

import { useLocationStore, usePreferencesStore } from "@/store";
import { convert } from "@/utils";
import { type CurrentWeather } from "@/services";

export default function CurrentWeatherContainer({
  currentWeatherData,
}: {
  currentWeatherData?: CurrentWeather;
}) {
  const locationState = useLocationStore((state) => state.location);

  const isCelsius = usePreferencesStore((state) => state.temperature.isCelsius);
  const isKm = usePreferencesStore((state) => state.windSpeed.isKm);
  const isMm = usePreferencesStore((state) => state.precipitation.isMm);

  const formatTemp = (celsius: number) =>
    isCelsius ? celsius.toFixed() : convert.temp.toF(celsius);

  if (!currentWeatherData) {
    return (
      <div className={styles.container}>
        <h2 className="sr-only">Current conditions</h2>
        <div className={styles.widgetSkeleton}>
          <div>
            <Skeleton className={styles.lineWide} />
            <Skeleton className={styles.lineNarrow} />
          </div>
          <div>
            <Skeleton className={styles.tempSkeleton} />
            <Skeleton className={styles.iconSkeleton} />
          </div>
        </div>
        <div className={styles.smallWidgetContainer}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.smallWidgetSkeleton}>
              <Skeleton className={styles.lineNarrow} />
              <Skeleton className={styles.lineMedium} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className="sr-only">Current conditions</h2>
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
