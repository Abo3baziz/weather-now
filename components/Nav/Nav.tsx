import Image from "next/image";
import logo from "@/public/images/logo.svg";
import styles from "./Nav.module.css";
import DropdownButton from "../DropdownButton/DropdownButton";
import unitsIcon from "@/public/images/icon-units.svg";

export default function Nav() {
  return (
    <nav className={styles.nav} aria-label="Main">
      <Image src={logo} alt="Weather Now" loading="eager" />
      <DropdownButton text="Units">
        <Image src={unitsIcon} alt="" aria-hidden="true" />
      </DropdownButton>
    </nav>
  );
}
