import Image from "next/image";
import icon from "@/public/images/icon-partly-cloudy.webp";
import styles from "./OneHourForecast.module.css";
import { convert } from "@/utils/unitConverting";
import { usePreferencesStore } from "@/store/preferences.store";
type OneHourForecastTypes = {
  temperature: number;
  time: string;
};

export default function OneHourForecast({ temperature, time }: OneHourForecastTypes) {
  const isCelsius = usePreferencesStore((state) => state.temperature.isCelsius);

  const formattedTemperature = temperature && isCelsius ? temperature.toFixed() + "°" : convert.temp.toF(temperature) + "°";

  return (
    <div className={styles.OneHourForecast}>
      <div>
        {/* TODO render custom icon based weather condition */}
        {/* <Image src={icon} alt="icon" width={40} /> */}
        <p>{time}</p>
      </div>

      <p>{formattedTemperature}</p>
    </div>
  );
}
