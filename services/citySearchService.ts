export type LocationTypes = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin?: string;
  countryCode: string;
};

type GeocodingResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  country_code: string;
};

type GeocodingResponse = {
  results?: GeocodingResult[];
};

export async function fetchLocationCoordinates(
  query: string,
  signal?: AbortSignal,
): Promise<LocationTypes[]> {
  if (!query.trim()) return [];

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query,
      )}&count=10&language=en&format=json`,
      { signal },
    );

    if (!res.ok) throw new Error("Failed to fetch locations");

    const data: GeocodingResponse = await res.json();

    return (data.results ?? []).map((loc) => ({
      id: loc.id,
      name: loc.name,
      latitude: loc.latitude,
      longitude: loc.longitude,
      country: loc.country,
      admin: loc.admin1,
      countryCode: loc.country_code,
    }));
  } catch {
    // TODO create global error state to manage errors
    return [];
  }
}
