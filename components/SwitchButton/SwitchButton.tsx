"use client";

import { usePreferencesStore } from "@/store/preferences.store";

export default function SwitchButton() {
  const { toggleMetricSystem } = usePreferencesStore((state) => state);
  const { isCelsius } = usePreferencesStore((state) => state.temperature);
  const { isKm } = usePreferencesStore((state) => state.windSpeed);
  const { isMm } = usePreferencesStore((state) => state.precipitation);

  const systemsInfo = {
    metric: "Switch to metric",
    imperial: "Switch to imperial",
  };

  let systemState = "metric";

  if (isCelsius === true && isKm === true && isMm === true) {
    systemState = "metric";
  } else {
    systemState = "imperial";
  }
  console.log(isCelsius, isKm, isMm);
  return (
    <button
      style={{ fontSize: 16 }}
      onClick={() => {
        toggleMetricSystem();
      }}
    >
      {systemState === "metric" ? systemsInfo.imperial : systemsInfo.metric}
    </button>
  );
}
