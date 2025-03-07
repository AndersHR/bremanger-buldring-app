import BackButton from "@/components/ui/BackButton";
import { format } from "date-fns";
import Image from "next/image";
import { Boulder, BoulderStatus } from "../../lib/definitions";
import EditButton from "../ui/EditButton";
import styles from "./boulder.module.css";

export function BoulderCard({
  boulder,
  mode,
  isAdmin,
}: {
  boulder: Boulder;
  mode: "list" | "single";
  isAdmin?: boolean;
}) {
  const isListMode = mode === "list";

  return (
    <div className={styles.boulder}>
      <div className={styles.boulderHeader}>
        {!isListMode && <BackButton />}
        <h3>{`${boulder.name}`}</h3>
        <div className={styles.boulderHeaderGrade}>{`${boulder.grade}`}</div>
        {!isListMode && isAdmin && (
          <EditButton href={`${boulder.id}/rediger`} />
        )}
      </div>
      {isListMode ? (
        <a href={`/bulder/${boulder.id}`}>
          <BoulderImage boulder={boulder} />
        </a>
      ) : (
        <BoulderImage boulder={boulder} />
      )}
      {!isListMode && boulder.boulder_group_name && (
        <BoulderGroupLabel boulder={boulder} />
      )}
      <div className={styles.boulderInfo}>
        {!(boulder.status == BoulderStatus.PROJECT) ? (
          <p>
            <b>Gradering:</b> {boulder.grade}
          </p>
        ) : (
          <p>PROSJEKT</p>
        )}
        <p>
          <b>Start:</b> {boulder.start}
        </p>
        {!isListMode && (
          <p>
            <b>Førstebestigning:</b> {boulder.first_ascender}
            {boulder.first_ascent
              ? ` - ${format(boulder.first_ascent, "dd.MM.yyyy")}`
              : ""}
          </p>
        )}
        <p>
          {<b>Beskrivelse:</b>} {`${boulder.description}`}
        </p>
      </div>
    </div>
  );
}

function BoulderGroupLabel({ boulder }: { boulder: Boulder }) {
  return (
    <div className={styles.boulderGroupLabel}>
      <a href={`/samling/${boulder.boulder_group_id}`}>
        <i>{boulder.boulder_group_name}</i>
      </a>
    </div>
  );
}

function BoulderImage({ boulder }: { boulder: Boulder }) {
  return (
    <div className={styles.boulderImgWrapper}>
      <Image
        src={boulder.image_base_url || ""}
        alt={`Bilde av bulder ${boulder.name}`}
        layout="fill"
        objectFit="contain"
        objectPosition="center"
        loading="lazy"
      />
    </div>
  );
}

{
  /* <div className={styles.boulderImgWrapper}>
        {isListMode ? (
          <a href={`/bulder/${boulder.id}`}>
            <img
              src={boulder.image_base_url ? boulder.image_base_url : ""}
              alt={`Bilde av bulder ${boulder.name}`}
            />
          </a>
        ) : (
          <img
            src={boulder.image_base_url ? boulder.image_base_url : ""}
            alt={`Bilde av bulder ${boulder.name}`}
          />
        )}
      </div> */
}
