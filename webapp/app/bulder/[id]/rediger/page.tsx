"use server";

import styles from "@/app/bulder/page.module.css";
import BoulderForm from "@/components/boulder/BoulderForm";
import { fetchBoulderById, fetchBoulderGroupById } from "@/lib/supabase/data";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: isAdmin } = await supabase.rpc("is_boulder_admin");

  if (!isAdmin) {
    redirect("/");
  }

  const boulder = await fetchBoulderById(params.id);
  const boulderGroup = boulder?.boulder_group_id
    ? await fetchBoulderGroupById(boulder.boulder_group_id)
    : null;

  // TODO: Behandle 404-feil
  if (boulder == null) {
    throw new Error("Boulder not found");
  }

  return (
    <div className={styles.boulderView}>
      <BoulderForm
        initialBoulder={boulder}
        initialBoulderGroup={boulderGroup}
        mode="edit"
      />
    </div>
  );
}
