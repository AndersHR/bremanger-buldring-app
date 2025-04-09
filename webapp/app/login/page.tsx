import styles from "@/app/page.module.css";
import { SocialAuth } from "@/components/Auth";

export default function Page() {
  return (
    <div className={styles.pageLayout}>
      <div className={styles.page}>
        <h1>Logg inn med Google:</h1>
        <SocialAuth />
      </div>
    </div>
  );
}
