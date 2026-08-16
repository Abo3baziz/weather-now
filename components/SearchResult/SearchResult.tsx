"use client";

import styles from "./SearchResult.module.css";

import Image from "next/image";

import { type LocationTypes } from "@/services";
import { useLocationStore } from "@/store";

export default function SearchResult({
  location,
  onSelect,
}: {
  location: LocationTypes;
  onSelect?: () => void;
}) {
  const setLocation = useLocationStore((state) => state.setActiveLocation);

  return (
    <button
      type="button"
      className={styles.result}
      onClick={() => {
        setLocation({
          name: location.name,
          country: location.country,
          longitude: location.longitude,
          latitude: location.latitude,
        });

        onSelect?.();
      }}>
      <Image
        src={`https://hatscripts.github.io/circle-flags/flags/${location.countryCode?.toLocaleLowerCase()}.svg`}
        alt={`${location.country} flag`}
        width={25}
        height={25}
      />
      <p>{`${location.name}, ${location?.admin === location.name ? "" : `${location?.admin},`} ${location?.country}`}</p>
    </button>
  );
}
