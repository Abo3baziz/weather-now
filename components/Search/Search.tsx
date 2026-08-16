"use client";

import Image from "next/image";
import styles from "./Search.module.css";
import searchIcon from "@/public/images/icon-search.svg";
import SearchResult from "../SearchResult/SearchResult";

import {
  fetchLocationCoordinates,
  type LocationTypes,
} from "@/services";

import { useRef, useState, useEffect } from "react";

export default function Search() {
  const [results, setResults] = useState<LocationTypes[]>([]);

  const [query, setQuery] = useState<string>("");

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    if (!hasQuery) return;

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      setIsSearching(true);
      setResults([]);

      const locations = await fetchLocationCoordinates(
        query,
        controller.signal,
      );

      if (!controller.signal.aborted) {
        setResults(locations);
        setIsSearching(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, hasQuery]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <form ref={formRef} className={styles.form} role="search">
      <div className={styles.search}>
        <input
          type="text"
          name="search"
          role="combobox"
          placeholder="Search for a place"
          value={query}
          autoComplete="off"
          aria-expanded={hasQuery && showDropdown}
          aria-controls="search-results"
          aria-autocomplete="list"
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim()) {
              setShowDropdown(true);
            }
          }}
        />

        <Image
          src={searchIcon}
          alt="search icon"
          className={styles.search_icon}
        />

        {hasQuery && showDropdown && (
          <div id="search-results" className={styles.box}>
            {results.length !== 0
              ? results.map((location: LocationTypes) => (
                  <SearchResult
                    location={location}
                    key={location.id}
                    onSelect={() => setShowDropdown(false)}
                  />
                ))
              : !isSearching && <p className={styles.noResults}>No matches</p>}
          </div>
        )}
      </div>
    </form>
  );
}
