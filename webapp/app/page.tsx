import styles from "./page.module.css";
import { BoulderTable } from "../components/boulder/BoulderTable";
import { fetchBoulders } from "../lib/supabase/data";

export default async function Home() {
  const boulders = await fetchBoulders();
  const uniqueBoulderGroupNames = Array.from(
    new Set(boulders.map((boulder) => boulder.boulder_group_name))
  ).sort((name1, name2) => {
    if (name1 == null) {
      return 1;
    }
    if (name2 == null) {
      return -1;
    }
    return -1 * name1.localeCompare(name2);
  });

  return (
    <div className={styles.pageLayout}>
      <div className={styles.page}>
        {uniqueBoulderGroupNames.map((name) => (
          <div key={name} className={styles.pageFeed}>
            <BoulderTable
              boulders={boulders
                .filter((boulder) => boulder.boulder_group_name == name)
                .sort((boulder1, boulder2) => {
                  return boulder1.name.localeCompare(boulder2.name);
                })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
