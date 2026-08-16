"use client";

import styles from "./UnitOption.module.css";

export default function UnitOption({
  groupName,
  optionName,
  isActive,
  toggleFunction,
}: {
  groupName: string;
  optionName: string;
  isActive: boolean;
  toggleFunction: () => void;
}) {
  let style = ``;

  if (isActive) {
    style = `${styles.active} ${styles.option_active}`;
  }

  return (
    <div className={styles.container}>
      <button
        type="button"
        aria-pressed={isActive}
        aria-label={`${groupName}: ${optionName}`}
        onClick={() => {
          toggleFunction();
        }}
        className={style}>
        {optionName}
      </button>
    </div>
  );
}
