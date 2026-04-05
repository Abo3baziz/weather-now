import Image from "next/image";
import logo from "@/public/images/logo.svg";
import styles from "./Nav.module.css";
import DropdownButton from "../DropdownButton/DropdownButton";
import unitsIcon from "@/public/images/icon-units.svg";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Image src={logo} alt="Logo Image" loading="eager" />
      <DropdownButton text="Units">
        <Image src={unitsIcon} alt="units Icon" />
      </DropdownButton>
    </nav>
  );
}
