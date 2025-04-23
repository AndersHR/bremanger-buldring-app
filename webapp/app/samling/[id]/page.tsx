import { BoulderTable } from "@/components/boulder/BoulderTable";
import BoulderCollectionMap from "@/components/kart/BoulderCollectionMapWrapper";
import BackButton from "@/components/ui/BackButton";
import EditButton from "@/components/ui/EditButton";
import Image from "@/components/ui/Image";
import PageHeader from "@/components/ui/PageHeader";
import { Boulder, BoulderGroup } from "@/lib/definitions";
import { useAuth } from "@/lib/providers/AuthProvider";
import {
  fetchBoulderGroupById,
  fetchBouldersByBoulderGroupid,
} from "@/lib/supabase/data";
import styles from "./page.module.css";

export const revalidate = 30;

export default async function Page({ params }: { params: { id: string } }) {
  const { isAdmin } = useAuth();

  const boulderGroup: BoulderGroup | null = await fetchBoulderGroupById(
    params.id
  );

  // TODO: Handle 404 error
  if (boulderGroup == null) {
    throw new Error("Boulder group not found");
  }

  const boulders: Boulder[] = await fetchBouldersByBoulderGroupid(params.id);

  return (
    <div>
      <PageHeader>
        <BackButton />
        {isAdmin && <EditButton href={`${boulderGroup.id}/rediger`} />}
      </PageHeader>
      <div className={styles.boulderGroupPage}>
        <div className={styles.heroCard}>
          <div className={styles.heroImageWrapper}>
            <Image
              className={styles.heroImage}
              // image_url={getBoulderGroupImageUrl(boulderGroup, boulders)}
              image_url={null}
              alt={`Bilde av ${boulderGroup.name}`}
            />
            <div className={styles.heroImageOverlay}>
              <div className={styles.heroImageText}>
                <h1 className={styles.boulderGroupTitle}>
                  {boulderGroup.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.infoTitle}>Beskrivelse</h3>
          <p className={styles.description}>
            {boulderGroup.description !== ""
              ? boulderGroup.description
              : "Ingen beskrivelse."}
          </p>
        </div>
        <div>
          <h2 className={styles.sectionTitle}>Lokasjon til buldere</h2>
          <div className={styles.mapWrapper}>
            <BoulderCollectionMap
              position={
                boulderGroup.latitude && boulderGroup.longitude
                  ? [boulderGroup.latitude, boulderGroup.longitude]
                  : null
              }
              zoom={18}
              boulders={boulders}
              height="24rem"
              width="100%"
            />
          </div>
        </div>
        <div>
          <h2 className={styles.sectionTitle}>Buldere i denne samlingen</h2>
          <BoulderTable
            boulders={boulders.sort((boulder1, boulder2) => {
              return boulder1.name.localeCompare(boulder2.name);
            })}
          />
        </div>
      </div>
    </div>
  );
}
