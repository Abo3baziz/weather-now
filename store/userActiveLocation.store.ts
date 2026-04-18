import { create } from "zustand";

type LocationStoreState = {
  location: {
    name?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
};

type LocationStoreActions = {
  setActiveLocation: (
    location:
      | LocationStoreState["location"]
      | ((
          prev: LocationStoreState["location"],
        ) => LocationStoreState["location"]),
  ) => void;
};

type LocationStore = LocationStoreState & LocationStoreActions;
export const useLocationStore = create<LocationStore>((set) => ({
  location: {
    name: "",
    country: "",
    latitude: 0,
    longitude: 0,
  },

  setActiveLocation: (location) =>
    set((state) => ({
      location:
        typeof location === "function" ? location(state.location) : location,
    })),
}));
