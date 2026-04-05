"use client";
import Image from "next/image";
import styles from "./DropdownButton.module.css";
import dropDownIcon from "@/public/images/icon-dropdown.svg";

import { useState } from "react";

export default function DropdownButton({
  children,
  text,
}: {
  children?: React.ReactNode | null;
  text: string;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);

  function handleChange() {
    setIsActive((prev) => !prev);
  }

  return (
    <button className={styles.dropdownButton} onClick={handleChange}>
      {children}
      <p>{text}</p>
      <Image src={dropDownIcon} alt="dropdown icon" />
    </button>
  );
}
