import Image from "next/image";
import styles from "./page.module.css";
import { BoulderCard, SingleBoulderCard } from "./ui/boulderCard";
import { fetchBoulderById } from "./lib/data";
import { BoulderTable } from "./ui/boulderTable";
import { fetchActiveBoulders } from "./lib/supabase/data";

export default async function Home() {

  const boulders = await fetchActiveBoulders();

  return (
    <div className={styles.page}>
      <div className={styles.feed}>
        <BoulderTable boulders={boulders} />
      </div>
    </div>
  );
}
