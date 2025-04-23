import styles from "@/app/bulder/page.module.css";
import { BoulderCard } from "@/components/boulder/BoulderCard";
import SingleBoulderMap from "@/components/kart/SingleBoulderMapWrapper";
import { fetchBoulderById } from "@/lib/supabase/data.client";
import { fetchIsAdmin } from "@/lib/supabase/data.server";

export const revalidate = 60;

export default async function Page({ params }: { params: { id: string } }) {
  const { data: isAdmin } = await fetchIsAdmin();

  const boulder = await fetchBoulderById(params.id);

  // TODO: Behandle 404-feil
  if (boulder == null) {
    throw new Error("Boulder not found");
  }

  return (
    <div className={styles.boulderView}>
      <BoulderCard boulder={boulder} isAdmin={isAdmin} mode="single" />
      <div className={styles.singleBoulderMapWrapper}>
        <SingleBoulderMap
          latitude={boulder.latitude}
          longitude={boulder.longitude}
          height="400px"
          width="100%"
          popupContent={`${boulder.name} - ${boulder.grade}`}
        />
      </div>
    </div>
  );
}
