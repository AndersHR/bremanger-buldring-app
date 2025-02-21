import styles from "@/app/page.module.css";
import BoulderForm from "@/components/boulder/BoulderForm";
import { fetchBoulderById, fetchBoulderGroupById } from "@/lib/supabase/data";

export default async function Page({ params }: { params: { id: string } }) {
  const boulder = await fetchBoulderById(params.id);
  const boulderGroup = boulder?.boulder_group_id
    ? await fetchBoulderGroupById(boulder.boulder_group_id)
    : null;
  // const SingleBoulderMap = dynamic(
  //   () => import("@/components/kart/SingleBoulderMap"),
  //   { ssr: false }
  // );

  // TODO: Behandle 404-feil
  if (boulder == null) {
    throw new Error("Boulder not found");
  }

  return (
    <div className={styles.page}>
      <div className={styles.boulderView}>
        <BoulderForm
          initialBoulder={boulder}
          initialBoulderGroup={boulderGroup}
          mode="edit"
        />
      </div>
    </div>
  );
}
