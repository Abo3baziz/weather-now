import styles from "./Not-Found.module.css";
import MainContainer from "../MainContainer/MainContainer";
import iconError from "@/public/images/icon-error.svg";
import iconRetry from "@/public/images/icon-retry.svg";

import Image from "next/image";
import Nav from "../Nav/Nav";
import Header from "../Header/Header";

export default function NotFound({
  errorMessage = "We couldn't connect to the server (API error). Please try again in a few moments",
  errorTitle = "Something went wrong",
}: {
  errorMessage: string | null;
  errorTitle: string | null;
}) {
  return (
    <MainContainer>
      <Nav />
      <div className={styles.box}>
        <Image src={iconError} alt="Error icon" width={48} />
        <Header text={errorTitle} />
        <p>{errorMessage}</p>
        <button>
          <Image src={iconRetry} alt="retry icon"></Image>Retry
        </button>
      </div>
    </MainContainer>
  );
}
