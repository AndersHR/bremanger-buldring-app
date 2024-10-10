import { Boulder } from "../lib/definitions";
import { format } from 'date-fns';

export function BoulderCard({ boulder }: { boulder: Boulder }) {
  return (
    <div>
        <h3 className="text-2xl ml-1 mb-2"><b>{`${boulder.name}`}</b></h3>
        <img className="my-3 mx-auto" src={boulder.image_base_url} alt="boulder"/>
        <p><b>Gradering:</b> {boulder.grade}</p>
        <p><b>Førstebestigning:</b> {boulder.first_ascender} - {`${format(boulder.first_ascent, 'dd.MM.yyyy')}`}</p>
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
