"use client";

import SwitchButton from "../SwitchButton/SwitchButton";
import UnitOption from "../UnitOption/UnitOption";
import styles from "./UnitsContainer.module.css";

import { usePreferencesStore } from "@/store";

export default function UnitsContainer() {
  const isCelsius = usePreferencesStore((state) => state.temperature.isCelsius);
  const isKm = usePreferencesStore((state) => state.windSpeed.isKm);
  const isMm = usePreferencesStore((state) => state.precipitation.isMm);

  const toggleTemperature = usePreferencesStore(
    (state) => state.toggleTemperature,
  );
  const toggleWindSpeed = usePreferencesStore(
    (state) => state.toggleWindSpeed,
  );
  const togglePrecipitation = usePreferencesStore(
    (state) => state.togglePrecipitation,
  );

  const sections = [
    {
      groupName: "Temperature",
      options: [
        {
          optionName: "Celsius (°C)",
          isActive: isCelsius,
          toggle: toggleTemperature,
        },
        {
          optionName: "Fahrenheit (°F)",
          isActive: !isCelsius,
          toggle: toggleTemperature,
        },
      ],
    },
    {
      groupName: "Wind Speed",
      options: [
        { optionName: "km/h", isActive: isKm, toggle: toggleWindSpeed },
        { optionName: "mph", isActive: !isKm, toggle: toggleWindSpeed },
      ],
    },
    {
      groupName: "Precipitation",
      options: [
        {
          optionName: "Millimeters (mm)",
          isActive: isMm,
          toggle: togglePrecipitation,
        },
        {
          optionName: "Inches (in)",
          isActive: !isMm,
          toggle: togglePrecipitation,
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <SwitchButton />
      {sections.map((section, index) => {
        const labelId = `${section.groupName.replace(/\s+/g, "-").toLowerCase()}-label`;

        return (
          <div key={section.groupName}>
            <div role="group" aria-labelledby={labelId}>
              <p id={labelId} className={styles.groupLabel}>
                {section.groupName}
              </p>
              <div className={styles.options}>
                {section.options.map((option) => (
                  <UnitOption
                    key={option.optionName}
                    groupName={section.groupName}
                    optionName={option.optionName}
                    isActive={option.isActive}
                    toggleFunction={option.toggle}
                  />
                ))}
              </div>
            </div>
            {index < sections.length - 1 && <hr />}
          </div>
        );
      })}
    </div>
  );
}
