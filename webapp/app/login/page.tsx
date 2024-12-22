import { SocialAuth } from "@/components/Auth";
import styles from "@/app/page.module.css";

export default function Page() {
  return (
    <div className={styles.pageLayout}>
      <div className={styles.page}>
        <SocialAuth />
      </div>
    </div>
  );
}
