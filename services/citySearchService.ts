export type LocationTypes = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin?: string;
  countryCode: string;
};

export async function fetchLocationCoordinates(
  query: string,
): Promise<LocationTypes[]> {
  if (!query.trim()) return [];

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query,
      )}&count=10&language=en&format=json`,
    );

    if (!res.ok) throw new Error("Failed to fetch locations");

    const data = await res.json();

    return (data.results ?? []).map((loc: any) => ({
      id: loc.id,
      name: loc.name,
      latitude: loc.latitude,
      longitude: loc.longitude,
      country: loc.country,
      admin: loc.admin1,
      countryCode: loc.country_code,
    }));
  } catch (error) {
    // TODO create global error state to manage errors
    return [];
  }
}
