"use client";

import SwitchButton from "../SwitchButton/SwitchButton";
import UnitOption from "../UnitOption/UnitOption";
import styles from "./UnitsWrapper.module.css";

import { useUIStore } from "@/store/ui.store";
import { usePreferencesStore } from "@/store/preferences.store";

export type optionMetadataTypes = { optionName: string; optionValue: string };

export type sectionOptionsMetadataTypes = {
  groupName: string;
  option_1: optionMetadataTypes;
  option_2: optionMetadataTypes;
};

export default function UnitsWrapper() {
  const isSidebarOpen = useUIStore((state) => state.sidebarOpen);

  let style: "none" | "initial";

  isSidebarOpen ? (style = "initial") : (style = "none");

  const sectionOptions: sectionOptionsMetadataTypes[] = [
    {
      groupName: "temperature",
      option_1: { optionName: "Celsius (°C)", optionValue: "c" },
      option_2: { optionName: "Fahrenheit (°F)", optionValue: "f" },
    },
    {
      groupName: "Wind Speed",
      option_1: { optionName: "km/h", optionValue: "km/h" },
      option_2: { optionName: "mph", optionValue: "mph" },
    },
    {
      groupName: "Precipitation",
      option_1: { optionName: "Millimeters (mm)", optionValue: "mm" },
      option_2: { optionName: "Inches (in)", optionValue: "in" },
    },
  ];

  const isCelsius = usePreferencesStore((state) => state.temperature.isCelsius);

  const isKm = usePreferencesStore((state) => state.windSpeed.isKm);

  const isMm = usePreferencesStore((state) => state.precipitation.isMm);

  const toggleTemperature = usePreferencesStore(
    (state) => state.toggleTemperature,
  );

  const togglePrecipitation = usePreferencesStore(
    (state) => state.togglePrecipitation,
  );

  const toggleWindSpeed = usePreferencesStore((state) => state.toggleWindSpeed);

  return (
    <>
      <div className={styles.wrapper} style={{ display: `${style}` }}>
        <SwitchButton />

        {/* Temperature */}

        <div>
          <p style={{ fontSize: 15 }}>{sectionOptions[0].groupName}</p>
          <div>
            <UnitOption
              optionName={sectionOptions[0].option_1.optionName}
              optionValue={sectionOptions[0].option_1.optionValue}
              isActive={isCelsius}
              toggleFunction={toggleTemperature}
            />
            <UnitOption
              optionName={sectionOptions[0].option_2.optionName}
              optionValue={sectionOptions[0].option_2.optionValue}
              isActive={!isCelsius}
              toggleFunction={toggleTemperature}
            />
          </div>
        </div>

        <hr />

        {/* windSpeed */}
        <div>
          <p style={{ fontSize: 15 }}>{sectionOptions[1].groupName}</p>
          <div>
            <UnitOption
              optionName={sectionOptions[1].option_1.optionName}
              optionValue={sectionOptions[1].option_1.optionValue}
              isActive={isKm}
              toggleFunction={toggleWindSpeed}
            />
            <UnitOption
              optionName={sectionOptions[1].option_2.optionName}
              optionValue={sectionOptions[1].option_2.optionValue}
              isActive={!isKm}
              toggleFunction={toggleWindSpeed}
            />
          </div>
        </div>

        <hr />

        {/* precipitation */}
        <div>
          <p style={{ fontSize: 15 }}>{sectionOptions[2].groupName}</p>
          <div>
            <UnitOption
              optionName={sectionOptions[2].option_1.optionName}
              optionValue={sectionOptions[2].option_1.optionValue}
              isActive={isMm}
              toggleFunction={togglePrecipitation}
            />
            <UnitOption
              optionName={sectionOptions[2].option_2.optionName}
              optionValue={sectionOptions[2].option_2.optionValue}
              isActive={!isMm}
              toggleFunction={togglePrecipitation}
            />
          </div>
        </div>
      </div>
    </>
  );
}
