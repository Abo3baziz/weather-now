import styles from "./ForecastContainer.module.css";

import CurrentWeatherContainer from "../CurrentWeatherContainer/CurrentWeatherContainer";
import DailyForecastContainer from "../DailyForecastContainer/DailyForecastContainer";
import HourlyForecastContainer from "../HourlyForecastContainer/HourlyForecastContainer";

import { useLocationStore } from "@/store/userActiveLocation.store";
import getUserLocation from "@/services/geolocationApi";
import { fetchWeatherData } from "@/services/fetchWeatherData";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchCityAndTimezone } from "@/services/reverseGeocodingWithTimezone";

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

  // TODO add loading state to all the app based on the fetch process
  const { isPending, data } = useQuery({
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

  if (!isPending) {
    console.log(data);
  }

  useEffect(() => {
    if (!data?.reverseGeocodingData) return;

    const reverseData = data.reverseGeocodingData as {
      city?: string;
      locality?: string;
      principalSubdivision?: string;
      countryName?: string;
      countryCode?: string;
    };

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
    getUserLocation();
  }, []);

  if (!data?.weatherData) {
    return <div className={styles.container} />;
  }

  return (
    <div className={styles.container}>
      <CurrentWeatherContainer currentWeatherData={data.weatherData.current} />

      <DailyForecastContainer dailyWeatherData={data.weatherData.daily} />

      <HourlyForecastContainer hourlyWeatherData={data.weatherData.hourly} />
    </div>
  );
}
