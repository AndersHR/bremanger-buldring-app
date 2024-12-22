import styles from "./ui.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <a target="_blank" href="https://icons8.com/icons/softteal">
          Icons
        </a>{" "}
        by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </div>
  );
}
// ©
