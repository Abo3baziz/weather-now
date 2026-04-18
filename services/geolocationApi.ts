import { useLocationStore } from '@/store/userActiveLocation.store';
import { fetchWeatherData } from './fetchWeatherData';

const setActiveLocation = useLocationStore.getState().setActiveLocation;

const success = (position: GeolocationPosition) => {
  const data = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  // set location in localstorage
  localStorage.setItem('location', JSON.stringify(data));

  // set location in location state
  setActiveLocation({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  });
};

interface PositionOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

const options: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 7000,
  maximumAge: Infinity,
};

const error = (err: GeolocationPositionError) => {
  // TODO handle errors in globel error state
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

export default function getUserLocation() {
  navigator.geolocation.getCurrentPosition(success, error, options);
}
