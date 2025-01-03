import styles from "@/app/page.module.css";
import { BoulderCard } from "@/components/boulder/BoulderCard";
import BoulderForm from "@/components/boulder/BoulderForm";
import SingleBoulderMap from "@/components/kart/SingleBoulderMap";
import { fetchBoulderById } from "@/lib/supabase/data";
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
    <div className={styles.page}>
      <div className={styles.boulderView}>
        <BoulderForm boulder={boulder} mode="edit" />
      </div>
    </div>
  );
}
