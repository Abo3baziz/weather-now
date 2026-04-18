import styles from "./SmallWidget.module.css";

export type WidgetTypes = {
  property: string;
  value: string;
};

export default function SmallWidget({ property, value }: WidgetTypes) {
  return (
    <>
      <div className={styles.small_widget}>
        <p>{property}</p>
        <p>{value}</p>
      </div>
    </>
  );
}
