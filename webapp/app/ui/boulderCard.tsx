import { Boulder } from "../lib/definitions";
import { format } from 'date-fns';
import styles from "../page.module.css";
import clsx from "clsx";

const DEFAULT_IMAGE_URL = "https://placehold.co/600x400";

export function BoulderCard({ boulder }: { boulder: Boulder }) {
  return (
    <div className={styles.boulder}>
        <h3 className="text-2xl ml-1 mb-2"><b>{`${boulder.name}`}</b></h3>
        <a href={`/bulder/${boulder.id}`}>
          <img src={boulder.image_base_url ? boulder.image_base_url : '' } alt={`Bilde av bulder ${boulder.name}`}/>
        </a>
        <p><b>Gradering:</b> {boulder.grade}</p>
        <p><b>Førstebestigning:</b> {boulder.first_ascender}{boulder.first_ascent ? ` - ${format(boulder.first_ascent, 'dd.MM.yyyy')}` : ""}</p>
        <p>{<b>Beskrivelse:</b>} {`${boulder.description}`}</p>
        {/*<p>{boulder.location}</p>*/}
        {/*<p>{`${boulder.first_ascent}`}</p>*/}
        {/*<p>{boulder.first_ascent}</p>*/}
    </div>
  );
}

export function SingleBoulderCard({ boulder }: { boulder: Boulder }) {
  return (
    <div className="p-2">
      <div className="p-5 border-solid border-2 rounded-lg">
        <BoulderCard boulder={boulder} />
      </div>
    </div>
  )
}

