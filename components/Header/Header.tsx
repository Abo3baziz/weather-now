import styles from "./Header.module.css";

export default function Header({ text }: { text: string | null }) {
  return (
    <>
      <header className={styles.header}>
        <h1>{text}</h1>
      </header>
    </>
  );
}
