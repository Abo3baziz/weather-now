const success = (position: GeolocationPosition) => {
  const data = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude,
  };
  localStorage.setItem("location", JSON.stringify(data));
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
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

export default function main() {
  navigator.geolocation.getCurrentPosition(success, error, options);
}
