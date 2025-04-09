import { BoulderTable } from "../components/boulder/BoulderTable";
import { fetchBoulders } from "../lib/supabase/data";
import styles from "./page.module.css";

export default async function Home() {
  const boulders = await fetchBoulders();
  const uniqueBoulderGroupNames = Array.from(
    new Set(boulders.map((boulder) => boulder.boulder_group_name))
  )
    .sort((name1, name2) => {
      if (name1 == null) {
        return 1;
      }
      if (name2 == null) {
        return -1;
      }
      return -1 * name1.localeCompare(name2);
    })
    .filter((name) => name != null);
  const boulderGroupNameToId = new Map<string, string>();
  uniqueBoulderGroupNames.forEach((name) => {
    if (name != null) {
      const boulderGroupID = boulders.find(
        (boulder) => boulder.boulder_group_name == name
      )?.boulder_group_id;
      if (boulderGroupID != null) {
        boulderGroupNameToId.set(name, boulderGroupID);
      }
    }
  });

  return (
    <div>
      {uniqueBoulderGroupNames.map((name) => (
        <div key={name} className={styles.pageFeed}>
          <a href={name ? `/samling/${boulderGroupNameToId.get(name)}` : ""}>
            <h1>{name}</h1>
          </a>
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
  );
}
