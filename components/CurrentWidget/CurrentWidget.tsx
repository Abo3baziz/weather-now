import Image from "next/image";

import styles from "./CurrentWidget.module.css";

import { getWeatherDescription, getWeatherIcon } from "@/utils";

type CurrentWidgetTypes = {
  country: string;
  name: string;
  temperature: string;
  weatherCode?: number;
};

export default function CurrentWidget({
  country,
  name,
  temperature,
  weatherCode,
}: CurrentWidgetTypes) {
  const clientDate = new Date();

  const formattedClientDate = clientDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const locationText = [name, country].filter(Boolean).join(", ");

  return (
    <section className={styles.container}>
      <div>
        <p className={styles.location}>{locationText}</p>

        <p className={styles.date}>{formattedClientDate}</p>
      </div>
      <div>
        <p className={styles.temperature}>
          {temperature ? `${temperature}°` : "-"}
        </p>

        <Image
          className={styles.icon}
          src={getWeatherIcon(weatherCode)}
          alt={getWeatherDescription(weatherCode)}
          width={80}
          height={80}
        />
      </div>
    </section>
  );
}
