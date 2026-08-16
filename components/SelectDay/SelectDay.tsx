import styles from "./SelectDay.module.css";

type SelectDayTypes = {
  days: string[];
  value: number;
  onChange: (index: number) => void;
};

export default function SelectDay({ days, value, onChange }: SelectDayTypes) {
  // TODO Change to custom select to have better styling
  return (
    <select
      className={styles.select}
      name="days"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}>
      {days.map((day, index) => (
        <option key={index} value={index}>
          {day}
        </option>
      ))}
    </select>
  );
}
