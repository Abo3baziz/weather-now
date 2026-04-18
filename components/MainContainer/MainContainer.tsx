import styles from "./MainContainer.module.css";

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.main}>{children}</main>;
}
