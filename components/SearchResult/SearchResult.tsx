import styles from "./SearchResult.module.css";

import Image from "next/image";

import { LocationTypes } from "@/services/citySearchService";
import { useLocationStore } from "@/store/userActiveLocation.store";

export default function SearchResult({
  location,
}: {
  location: LocationTypes;
}) {
  const setLocation = useLocationStore((state) => state.setActiveLocation);

  return (
    <button
      className={styles.result}
      onClick={(e) => {
        e.preventDefault();

        setLocation({
          name: location.name,
          country: location.country,
          longitude: location.longitude,
          latitude: location.latitude,
        });

        // TODO close result box function
      }}>
      <Image
        src={`https://hatscripts.github.io/circle-flags/flags/${location.countryCode?.toLocaleLowerCase()}.svg`}
        alt="flag"
        width={25}
        height={25}
      />
      <p>{`${location.name}, ${location?.admin === location.name ? "" : `${location?.admin},`} ${location?.country}`}</p>
    </button>
  );
}
