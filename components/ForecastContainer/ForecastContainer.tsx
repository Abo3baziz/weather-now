"use client";

import styles from "./ForecastContainer.module.css";

import CurrentWeatherContainer from "../CurrentWeatherContainer/CurrentWeatherContainer";
import DailyForecastContainer from "../DailyForecastContainer/DailyForecastContainer";
import HourlyForecastContainer from "../HourlyForecastContainer/HourlyForecastContainer";

import { useLocationStore } from "@/store";
import {
  fetchCityAndTimezone,
  fetchWeatherData,
  getUserLocation,
  type ReverseGeocodingResponse,
} from "@/services";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function ForecastContainer() {
  const locationState = useLocationStore((state) => state.location);
  const setActiveLocation = useLocationStore(
    (state) => state.setActiveLocation,
  );

  const { latitude, longitude } = locationState;

  const hasValidLocation =
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    (latitude !== 0 || longitude !== 0);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["weatherData", latitude, longitude],
    enabled: hasValidLocation,
    queryFn: async () => {
      const weatherData = await fetchWeatherData(latitude!, longitude!);
      const reverseGeocodingData = await fetchCityAndTimezone(
        latitude!,
        longitude!,
      );

      return { weatherData, reverseGeocodingData };
    },
  });

  useEffect(() => {
    if (!data?.reverseGeocodingData) return;

    const reverseData: ReverseGeocodingResponse = data.reverseGeocodingData;

    const name =
      reverseData.city ??
      reverseData.locality ??
      reverseData.principalSubdivision ??
      "";
    const country = reverseData.countryName ?? reverseData.countryCode ?? "";

    setActiveLocation((prev) => ({
      ...prev,
      name,
      country,
    }));
  }, [data?.reverseGeocodingData, setActiveLocation]);

  useEffect(() => {
    getUserLocation({
      onPosition: (coords) => setActiveLocation(coords),
    });
  }, [setActiveLocation]);

  if (!hasValidLocation) {
    return (
      <div className={styles.stateBox} role="status">
        <p className={styles.stateTitle}>No location selected yet</p>
        <p className={styles.stateText}>
          Search for a place above, or allow location access to see your local
          weather.
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className={styles.stateBox} role="status">
        <p className={styles.stateTitle}>Loading weather</p>
        <p className={styles.stateText}>Fetching the latest forecast…</p>
      </div>
    );
  }

  if (error || !data?.weatherData) {
    return (
      <div className={styles.stateBox} role="status">
        <p className={styles.stateTitle}>Something went wrong</p>
        <p className={styles.stateText}>
          We couldn&apos;t load the weather for this location. Please try again
          in a few moments.
        </p>
        <button
          className={styles.retryButton}
          onClick={() => {
            refetch();
          }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <CurrentWeatherContainer currentWeatherData={data.weatherData.current} />

      <DailyForecastContainer dailyWeatherData={data.weatherData.daily} />

      <HourlyForecastContainer hourlyWeatherData={data.weatherData.hourly} />
    </div>
  );
}
