import styles from "@/app/page.module.css";
import BoulderForm from "@/components/boulder/BoulderForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data: isAdmin } = await supabase.rpc("is_boulder_admin");

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className={styles.page}>
      <div className={styles.boulderView}>
        <BoulderForm
          mode="create"
          initialBoulderGroup={null}
          initialBoulder={null}
        />
      </div>
    </div>
  );
}
