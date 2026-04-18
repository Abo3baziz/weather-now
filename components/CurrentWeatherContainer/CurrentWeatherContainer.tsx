"use client";

import styles from "./CurrentWeatherContainer.module.css";

import SmallWidget from "../SmallWidget/SmallWidget";
import CurrentWidget from "../CurrentWidget/CurrentWidget";

import { useLocationStore } from "@/store/userActiveLocation.store";
import { usePreferencesStore } from "@/store/preferences.store";
import { convert } from "@/utils/unitConverting";

type CurrentWeatherDataTypes = {
  humidity: number;
  precipitation: number;
  temperature: number;
  windSpeed: number;
};

export default function CurrentWeatherContainer({
  currentWeatherData,
}: {
  currentWeatherData: CurrentWeatherDataTypes;
}) {
  const locationState = useLocationStore((state) => state.location);

  const isCelsius = usePreferencesStore((state) => state.temperature.isCelsius);
  const isKm = usePreferencesStore((state) => state.windSpeed.isKm);
  const isMm = usePreferencesStore((state) => state.precipitation.isMm);

  return (
    <div className={styles.container}>
      <CurrentWidget
        country={locationState.country ?? ""}
        name={locationState.name ?? ""}
        temperature={
          currentWeatherData?.temperature && isCelsius
            ? currentWeatherData?.temperature.toFixed()
            : convert.temp.toF(currentWeatherData?.temperature)
        }
      />
      <div className={styles.smallWidgetContainer}>
        <SmallWidget
          property="Feels Like"
          value={
            currentWeatherData?.temperature && isCelsius
              ? currentWeatherData?.temperature.toFixed() + "°"
              : convert.temp.toF(currentWeatherData?.temperature) + "°"
          }
        />
        <SmallWidget
          property="Humidity"
          value={currentWeatherData?.humidity + "%"}
        />
        <SmallWidget
          property="Wind"
          value={
            currentWeatherData?.windSpeed && isKm
              ? currentWeatherData?.windSpeed.toFixed() + " Km/h"
              : convert.speed.toMph(currentWeatherData?.windSpeed) + " mph"
          }
        />
        <SmallWidget
          property="Precipitation"
          value={
            currentWeatherData?.precipitation.toString() && isMm
              ? currentWeatherData?.precipitation + " mm"
              : convert.length
                  .mmToInch(currentWeatherData?.precipitation)
                  .toString() + " Inch"
          }
        />
      </div>
    </div>
  );
}
