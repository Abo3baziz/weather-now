"use client";

import Image from "next/image";
import styles from "./DropdownButton.module.css";
import dropDownIcon from "@/public/images/icon-dropdown.svg";
import UnitsContainer from "../UnitsContainer/UnitsContainer";

import { useUIStore } from "@/store/ui.store";

export default function DropdownButton({
  children,
  text,
}: {
  children?: React.ReactNode | null;
  text: string;
}) {
  const toggleUi = useUIStore((state) => state.toggleSidebar);

  return (
    <div className={styles.container}>
      <button
        className={styles.dropdownButton}
        onClick={() => {
          toggleUi();
        }}>
        {children}
        <p>{text}</p>
        <Image src={dropDownIcon} alt="dropdown icon" />
      </button>

      <UnitsContainer />
    </div>
  );
}
