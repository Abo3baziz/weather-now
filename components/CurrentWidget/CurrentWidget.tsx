"use client";

import styles from "./CurrentWidget.module.css";

import { useLocationStore } from "@/store/userActiveLocation.store";

type CurrentWidgetTypes = {
  country: string;
  name: string;
  temperature: string;
};

export default function CurrentWidget({
  country,
  name,
  temperature,
}: CurrentWidgetTypes) {
  const clientDate = new Date();

  const formattedClientDate = clientDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const locationState = useLocationStore((state) => state.location);
  return (
    <>
      <section className={styles.container}>
        <div>
          <p className={styles.location}>
            {true ? `${locationState.name}, ${locationState.country}` : ""}
          </p>

          <p className={styles.date}>{formattedClientDate}</p>
        </div>
        <div>
          <p className={styles.temperature}>
            {temperature ? `${temperature}°` : "-"}
          </p>
          {/* TODO pass icon here */}
          <p
            className={styles.icon}
            style={{
              backgroundImage: `url("${"/images/icon-drizzle.webp"}")`,
            }}></p>
        </div>
      </section>
    </>
  );
}
