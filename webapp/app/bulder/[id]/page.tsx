import styles from "@/app/page.module.css";
import { BoulderCard } from "@/components/boulder/BoulderCard";
import { fetchBoulderById } from "@/lib/supabase/data";
import { createClient } from "@/lib/supabase/server";
import dynamic from "next/dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const boulder = await fetchBoulderById(params.id);
  const supabase = await createClient();
  const { data: isAdmin } = await supabase.rpc("is_boulder_admin");

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
          <BoulderCard boulder={boulder} isAdmin={isAdmin} mode="single" />
          <div className={styles.singleBoulderMapWrapper}>
            <SingleBoulderMap boulder={boulder} height="400px" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}
