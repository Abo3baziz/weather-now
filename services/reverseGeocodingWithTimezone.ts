"use server";

type ReverseGeocodingResponse = {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
  countryCode?: string;
  status?: number;
  description?: string;
};

export async function fetchCityAndTimezone(
  latitude: number,
  longitude: number,
) {
  const baseUrl = `https://api-bdc.net/data/reverse-geocode-with-timezone?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${process.env.REVERSE_GEOCODING_WITH_TIMEZONE_API}`;

  const response = await fetch(baseUrl);
  const data: ReverseGeocodingResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.description ??
        `Reverse geocoding failed with status ${response.status}`,
    );
  }

  return data;
}
