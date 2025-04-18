import { BoulderTable } from "@/components/boulder/BoulderTable";
import BoulderCollectionMap from "@/components/kart/BoulderCollectionMapWrapper";
import { Boulder, BoulderGroup } from "@/lib/definitions";
import {
  fetchBoulderGroupById,
  fetchBouldersByBoulderGroupid,
} from "@/lib/supabase/data";
import styles from "./page.module.css";

export const revalidate = 10;

export default async function Page({ params }: { params: { id: string } }) {
  const boulderGroup: BoulderGroup | null = await fetchBoulderGroupById(
    params.id
  );

  // TODO: Handle 404 error
  if (boulderGroup == null) {
    throw new Error("Boulder group not found");
  }

  const boulders: Boulder[] = await fetchBouldersByBoulderGroupid(params.id);

  return (
    <div className={styles.boulderGroupPage}>
      <h1 className={styles.boulderGroupTitle}>{boulderGroup.name}</h1>
      <p className={styles.boulderGroupDescription}>
        {boulderGroup.description}
      </p>
      <BoulderCollectionMap
        position={
          boulderGroup.latitude && boulderGroup.longitude
            ? [boulderGroup.latitude, boulderGroup.longitude]
            : null
        }
        zoom={10}
        boulders={boulders}
        height="500px"
        width="100%"
      />
      <BoulderTable
        boulders={boulders.sort((boulder1, boulder2) => {
          return boulder1.name.localeCompare(boulder2.name);
        })}
      />
    </div>
  );
}
