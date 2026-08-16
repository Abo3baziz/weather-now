export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

type GeolocationHandlers = {
  onPosition?: (coords: GeoCoordinates) => void;
  onError?: (error: GeolocationPositionError) => void;
};

const STORAGE_KEY = "location";

const options: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 7000,
  maximumAge: Infinity,
};

function getCachedPosition(): GeoCoordinates | null {
  const cached = localStorage.getItem(STORAGE_KEY);

  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached) as GeoCoordinates;

    if (
      typeof parsed?.latitude === "number" &&
      typeof parsed?.longitude === "number"
    ) {
      return parsed;
    }
  } catch {
    // ignore corrupted cache
  }

  return null;
}

export default function getUserLocation({
  onPosition,
  onError,
}: GeolocationHandlers = {}) {
  const cached = getCachedPosition();

  if (cached) onPosition?.(cached);

  if (typeof navigator === "undefined" || !navigator.geolocation) {
    onError?.(new GeolocationPositionError());
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords: GeoCoordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(coords));

      onPosition?.(coords);
    },
    (error) => {
      onError?.(error);
    },
    options,
  );
}
