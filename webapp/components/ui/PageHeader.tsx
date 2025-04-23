import styles from "./ui.module.css";

export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.pageHeader}>{children}</div>;
}
