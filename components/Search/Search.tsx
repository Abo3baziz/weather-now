"use client";

import Image from "next/image";
import styles from "./Search.module.css";
import searchIcon from "@/public/images/icon-search.svg";
import SearchResult from "../SearchResult/SearchResult";

import {
  fetchLocationCoordinates,
  LocationTypes,
} from "@/services/citySearchService";

import { useState, useEffect } from "react";

export default function Search() {
  let result: LocationTypes[] = [];

  const [results, setResults] = useState<LocationTypes[]>([]);

  const [query, setQuery] = useState<string>("");

  async function fetchFunction(query: string) {
    result = await fetchLocationCoordinates(query);
    setResults(() => [...result]);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) {
        fetchFunction(query);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <form className={styles.form}>
      <div className={styles.search}>
        <input
          type="text"
          name="search"
          placeholder="Search for a place"
          onChange={(e) => setQuery(e.target.value)}
        />

        <Image
          src={searchIcon}
          alt="search icon"
          className={styles.search_icon}
        />

        <div
          className={styles.box}
          style={{ display: query ? "initial" : "none" }}>
          {results.length !== 0
            ? results.map((location: LocationTypes) => (
                <SearchResult location={location} key={location.id} />
              ))
            : null}
        </div>
      </div>
    </form>
  );
}
