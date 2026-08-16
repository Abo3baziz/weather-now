"use client";

import styles from "./SearchResult.module.css";

import Image from "next/image";

import { type LocationTypes } from "@/services";

export default function SearchResult({
  id,
  location,
  isActive,
  onMouseEnter,
  onSelect,
}: {
  id: string;
  location: LocationTypes;
  isActive: boolean;
  onMouseEnter: () => void;
  onSelect: () => void;
}) {
  const locationText = `${location.name}, ${
    location?.admin === location.name ? "" : `${location?.admin},`
  } ${location?.country}`;

  return (
    <div
      id={id}
      role="option"
      aria-selected={isActive}
      className={`${styles.result} ${isActive ? styles.active : ""}`}
      onMouseEnter={onMouseEnter}
      onClick={onSelect}>
      <Image
        src={`https://hatscripts.github.io/circle-flags/flags/${location.countryCode?.toLocaleLowerCase()}.svg`}
        alt=""
        width={25}
        height={25}
      />
      <span>{locationText}</span>
    </div>
  );
}
