import { create } from "zustand";

type PreferencesState = {
  isMetric: boolean;
  temperature: {
    isCelsius: boolean;
  };
  windSpeed: {
    isKm: boolean;
  };
  precipitation: {
    isMm: boolean;
  };
};

type ToggleBoolean = boolean | ((current: boolean) => boolean);

type PreferencesActions = {
  toggleMetricSystem: (value?: ToggleBoolean) => void;
  toggleTemperature: (value?: ToggleBoolean) => void;
  toggleWindSpeed: (value?: ToggleBoolean) => void;
  togglePrecipitation: (value?: ToggleBoolean) => void;
};

type PreferencesStore = PreferencesState & PreferencesActions;

const usePreferencesStore = create<PreferencesStore>((set) => ({
  // state
  isMetric: true,
  temperature: { isCelsius: true },
  windSpeed: { isKm: true },
  precipitation: { isMm: true },

  // actions
  toggleMetricSystem: (value) =>
    set((state) => {
      const next =
        typeof value === "function"
          ? value(state.isMetric)
          : (value ?? !state.isMetric);

      return {
        isMetric: next,
        temperature: { isCelsius: next },
        windSpeed: { isKm: next },
        precipitation: { isMm: next },
      };
    }),

  toggleTemperature: (value) =>
    set((state) => {
      const next =
        typeof value === "function"
          ? value(state.temperature.isCelsius)
          : (value ?? !state.temperature.isCelsius);

      return {
        temperature: { isCelsius: next },
      };
    }),

  toggleWindSpeed: (value) =>
    set((state) => {
      const next =
        typeof value === "function"
          ? value(state.windSpeed.isKm)
          : (value ?? !state.windSpeed.isKm);

      return {
        windSpeed: { isKm: next },
      };
    }),

  togglePrecipitation: (value) =>
    set((state) => {
      const next =
        typeof value === "function"
          ? value(state.precipitation.isMm)
          : (value ?? !state.precipitation.isMm);

      return {
        precipitation: { isMm: next },
      };
    }),
}));

export { usePreferencesStore };
