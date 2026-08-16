import styles from "./Skeleton.module.css";

export default function Skeleton({
  className,
}: {
  className?: string;
}) {
  return <span className={`${styles.block} ${className ?? ""}`} aria-hidden="true" />;
}
