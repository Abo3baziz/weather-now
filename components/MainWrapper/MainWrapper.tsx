import styles from "./MainWrapper.module.css";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.main}>{children}</main>;
}
