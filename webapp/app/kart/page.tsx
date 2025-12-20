import styles from "@/app/page.module.css";
import OverviewMapWrapper from "@/components/kart/OverviewMapWrapper";

export default async function Page() {
  return (
    <div className={styles.page}>
      <OverviewMapWrapper height="400px" width="800px" />
    </div>
  );
}
