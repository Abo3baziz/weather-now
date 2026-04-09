"use client";

import styles from "./UnitOption.module.css";

import { optionMetadataTypes } from "../UnitsWrapper/UnitsWrapper";

export default function UnitOption({
  optionName,
  optionValue,
  isActive,
  toggleFunction,
}: {
  optionName: optionMetadataTypes["optionName"];
  optionValue: optionMetadataTypes["optionValue"];
  isActive: boolean;
  toggleFunction: () => void;
}) {
  let style = ``;

  if (isActive) {
    style = `${styles.active} ${styles.option_active}`;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <option
          value={optionValue}
          onClick={() => {
            toggleFunction();
          }}
          className={style}
        >
          {optionName}
        </option>
      </div>
    </>
  );
}
