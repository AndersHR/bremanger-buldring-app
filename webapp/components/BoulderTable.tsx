import { Boulder } from "../lib/definitions";
import { BoulderCard } from "./BoulderCard";
import styles from "./boulder.module.css";

export function BoulderTable({ boulders }: { boulders: Boulder[] }) {
  return (
    <div>
      {boulders.map((boulder, index) => (
        <div
          key={`${index}-${boulder.id}`}
          className={styles.boulderTableContainer}
        >
          <BoulderCard boulder={boulder} mode="list" />
        </div>
      ))}
    </div>
  );
}
