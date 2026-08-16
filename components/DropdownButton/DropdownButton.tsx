"use client";

import Image from "next/image";
import styles from "./DropdownButton.module.css";
import dropDownIcon from "@/public/images/icon-dropdown.svg";
import UnitsContainer from "../UnitsContainer/UnitsContainer";

import { useUIStore } from "@/store";
import { useEffect, useRef } from "react";

export default function DropdownButton({
  children,
  text,
}: {
  children?: React.ReactNode | null;
  text: string;
}) {
  const isSidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleUi = useUIStore((state) => state.toggleSidebar);

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const focusable = panelRef.current?.querySelector<HTMLElement>(
      "button:not(:disabled), [tabindex]",
    );
    focusable?.focus();
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleUi();
        triggerRef.current?.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        toggleUi();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isSidebarOpen, toggleUi]);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.dropdownButton}
        aria-haspopup="true"
        aria-expanded={isSidebarOpen}
        onClick={() => {
          toggleUi();
        }}>
        {children}
        <span>{text}</span>
        <Image src={dropDownIcon} alt="" aria-hidden="true" />
      </button>

      {isSidebarOpen && (
        <div ref={panelRef}>
          <UnitsContainer />
        </div>
      )}
    </div>
  );
}
