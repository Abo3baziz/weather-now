"use client";

import Image from "next/image";
import styles from "./Search.module.css";
import searchIcon from "@/public/images/icon-search.svg";
import SearchResult from "../SearchResult/SearchResult";

import {
  fetchLocationCoordinates,
  type LocationTypes,
} from "@/services";

import { useLocationStore } from "@/store";
import { useRef, useState, useEffect } from "react";

export default function Search() {
  const setLocation = useLocationStore((state) => state.setActiveLocation);

  const [results, setResults] = useState<LocationTypes[]>([]);

  const [query, setQuery] = useState<string>("");

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [activeIndex, setActiveIndex] = useState<number>(-1);

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
        setActiveIndex(-1);
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
        setActiveIndex(-1);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selectLocation = (location: LocationTypes) => {
    setLocation({
      name: location.name,
      country: location.country,
      longitude: location.longitude,
      latitude: location.latitude,
    });

    setShowDropdown(false);
    setActiveIndex(-1);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || results.length === 0) {
      if (event.key === "Escape") {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(results.length - 1);
        break;
      case "Enter":
        event.preventDefault();
        if (activeIndex >= 0) {
          selectLocation(results[activeIndex]);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        setActiveIndex(-1);
        break;
    }
  };

  return (
    <form ref={formRef} className={styles.form} role="search">
      <div className={styles.search}>
        <label htmlFor="search-input" className="sr-only">
          Search for a place
        </label>
        <input
          id="search-input"
          type="text"
          name="search"
          role="combobox"
          placeholder="Search for a place"
          value={query}
          autoComplete="off"
          aria-expanded={hasQuery && showDropdown}
          aria-controls="search-results"
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0
              ? `search-result-${results[activeIndex]?.id}`
              : undefined
          }
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
            if (e.target.value.trim()) {
              setShowDropdown(true);
            }
          }}
          onKeyDown={handleInputKeyDown}
        />

        <Image
          src={searchIcon}
          alt=""
          aria-hidden="true"
          className={styles.search_icon}
        />

        {hasQuery && showDropdown && (
          <div
            id="search-results"
            role="listbox"
            aria-label="Search results"
            className={styles.box}>
            {results.length !== 0
              ? results.map((location: LocationTypes, index) => (
                  <SearchResult
                    key={location.id}
                    id={`search-result-${location.id}`}
                    location={location}
                    isActive={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onSelect={() => selectLocation(location)}
                  />
                ))
              : !isSearching && <p className={styles.noResults}>No matches</p>}
          </div>
        )}
      </div>
    </form>
  );
}
