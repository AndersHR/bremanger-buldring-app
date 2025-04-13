import styles from "@/app/page.module.css";
import { BoulderCard } from "@/components/boulder/BoulderCard";
import SingleBoulderMap from "@/components/kart/SingleBoulderMapWrapper";
import { fetchBoulderById } from "@/lib/supabase/data";
import { createClient } from "@/lib/supabase/server";

export default async function Page({ params }: { params: { id: string } }) {
  const boulder = await fetchBoulderById(params.id);
  const supabase = await createClient();

  const { data: isAdmin } = await supabase.rpc("is_boulder_admin");

  // TODO: Behandle 404-feil
  if (boulder == null) {
    throw new Error("Boulder not found");
  }

  return (
    <div>
      <div className={styles.boulderView}>
        <BoulderCard boulder={boulder} isAdmin={isAdmin} mode="single" />
        <div className={styles.singleBoulderMapWrapper}>
          <SingleBoulderMap
            latitude={boulder.latitude}
            longitude={boulder.longitude}
            height="400px"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}
