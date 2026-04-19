import styles from "./SelectDay.module.css";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function SelectDay() {
  // TODO Change to custom select to have better styling
  // TODO connect with active day state
  return (
    <select
      className={styles.select}
      name="days"
      // value={""}
      // onChange={()=>{}}
    >
      {days.map((day) => (
        <option key={day} value={day.toLowerCase()}>
          {day}
        </option>
      ))}
    </select>
  );
}
