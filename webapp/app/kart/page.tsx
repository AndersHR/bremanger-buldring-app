import styles from "@/app/page.module.css";
import dynamic from "next/dynamic";

export default async function Page() {
  const OverviewMap = dynamic(() => import("@/components/kart/OverviewMap"), {
    ssr: false,
  });

  return (
    <div className={styles.page}>
      <OverviewMap height="400px" width="800px" />
    </div>
  );
}
