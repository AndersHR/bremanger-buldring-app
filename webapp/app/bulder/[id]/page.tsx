import styles from "@/app/page.module.css";
import { fetchBoulderById } from "@/lib/supabase/data";
import { BoulderCard } from "@/components/boulder/BoulderCard";
import dynamic from "next/dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const boulder = await fetchBoulderById(params.id);
  const SingleBoulderMap = dynamic(
    () => import("@/components/kart/SingleBoulderMap"),
    { ssr: false }
  );

  // TODO: Behandle 404-feil
  if (boulder == null) {
    throw new Error("Boulder not found");
  }

  return (
    <div className={styles.pageLayout}>
      <div className={styles.page}>
        <div className={styles.boulderView}>
          <BoulderCard boulder={boulder} mode="single" />
          <div className={styles.singleBoulderMapWrapper}>
            <SingleBoulderMap boulder={boulder} height="400px" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}
