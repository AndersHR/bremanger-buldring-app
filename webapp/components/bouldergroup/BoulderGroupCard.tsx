import { Boulder, BoulderGroup } from "@/lib/definitions";
import {
  fetchBoulderImagePublicUrl,
  fetchBouldersByBoulderGroupid,
} from "@/lib/supabase/data";
import Link from "next/link";
import Image from "../ui/Image";
import styles from "./boulderGroupCard.module.css";

export default async function BoulderCollectionCard({
  boulderGroup,
}: {
  boulderGroup: BoulderGroup;
}) {
  const boulders: Boulder[] = await fetchBouldersByBoulderGroupid(
    boulderGroup.id
  );
  const boulderCount = boulders.length;

  // We use the boulder group image if available, if not we default to the image of the first boulder
  const imageUrl = boulderGroup.image_url
    ? fetchBoulderImagePublicUrl(boulderGroup.image_url, "bouldergroupimages")
    : boulders[0]?.image_base_url
    ? fetchBoulderImagePublicUrl(boulders[0].image_base_url, "boulder_images")
    : "";

  return (
    <Link className={styles.groupLink} href={`/samling/${boulderGroup.id}`}>
      <div className={styles.boulderGroupCard}>
        <div className={styles.imageWrapper}>
          <Image
            image_url={imageUrl}
            alt={`Bilde av bulder ${boulderGroup.name}`}
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 768px) 600px, (max-width: 1200px) 600px, 600px"
          />
          {/* overlay */}
          <div className={styles.imageOverlay}>
            <div className={styles.imageText}>
              <h2 className={styles.imageTitle}>{boulderGroup.name}</h2>
              <p className={styles.imageCount}>
                {`${boulderCount}`} {boulderCount === 1 ? "bulder" : "buldere"}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.boulderGroupInfo}>
          <p className={styles.boulderGroupInfoText}>
            {boulderGroup.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
