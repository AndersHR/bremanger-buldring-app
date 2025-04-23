import { fetchBoulderImagePublicUrl } from "@/lib/supabase/data";
import { Boulder } from "../../lib/definitions";
import Image from "../ui/Image";
import styles from "./boulder.module.css";

export default function BoulderImage({ boulder }: { boulder: Boulder }) {
  return (
    <div className={styles.boulderImgWrapper}>
      <Image
        image_url={
          boulder.image_base_url
            ? fetchBoulderImagePublicUrl(
                boulder.image_base_url,
                "boulder_images"
              )
            : ""
        }
        alt={`Bilde av bulder ${boulder.name}`}
        style={{
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </div>
  );
}
