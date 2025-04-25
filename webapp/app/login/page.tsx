import { SocialAuth } from "@/components/auth/SocialAuth";
import styles from "./login.module.css";

export default function Page() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.card}>
        <div className={styles.cardHeaderAndContent}>
          <div className={styles.cardHeader}>
            <h1>Velkommen!</h1>
            <span className={styles.cardHeaderText}>
              Logg inn eller registrer deg med din Google-konto
            </span>
          </div>
          <div className={styles.cardContent}>
            <SocialAuth />
          </div>
        </div>
        <div className={styles.cardFooter}>
          Andre innloggingsmetoder er enda ikke implementert
        </div>
      </div>
    </div>
  );
}
