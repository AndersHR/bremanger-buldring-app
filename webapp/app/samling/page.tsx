import BoulderGroupCard from "@/components/bouldergroup/BoulderGroupCard";
import BackButton from "@/components/ui/BackButton";
import Divider from "@/components/ui/Divider";
import PageHeader from "@/components/ui/PageHeader";
import { BoulderGroup } from "@/lib/definitions";
import { fetchBoulderGroups } from "@/lib/supabase/data";
import styles from "./page.module.css";

export default async function Page() {
  const boulderGroups: BoulderGroup[] = await fetchBoulderGroups();

  return (
    <div className={styles.container}>
      <div>
        <PageHeader>
          <BackButton />
          <h1 className={styles.title}>Samlinger</h1>
        </PageHeader>
        <Divider />
      </div>
      <div className={styles.grid}>
        {boulderGroups.map((boulderGroup) => {
          return <BoulderGroupCard boulderGroup={boulderGroup} />;
        })}
      </div>
    </div>
  );
}
