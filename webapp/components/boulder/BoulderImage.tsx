import { fetchBoulderImagePublicUrl } from "@/lib/supabase/data";
import Image from "next/image";
import { Boulder } from "../../lib/definitions";
import styles from "./boulder.module.css";

export default function BoulderImage({ boulder }: { boulder: Boulder }) {
  return (
    <div className={styles.boulderImgWrapper}>
      <Image
        src={
          boulder.image_base_url
            ? fetchBoulderImagePublicUrl(boulder.image_base_url)
            : ""
        }
        alt={`Bilde av bulder ${boulder.name}`}
        fill
        style={{
          objectFit: "contain",
          objectPosition: "center",
        }}
        loading="lazy"
        sizes="(max-width: 768px) 600px, (max-width: 1200px) 600px, 600px"
      />
    </div>
  );
}
