import styles from "@/app/page.module.css";
import BoulderForm from "@/components/boulder/BoulderForm";

export default async function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.boulderView}>
        <BoulderForm mode="create" />
      </div>
    </div>
  );
}
