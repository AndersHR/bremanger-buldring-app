import { Boulder } from '../lib/definitions';
import { BoulderCard } from './boulderCard';

export function BoulderTable({ boulders }: { boulders: Boulder[] }) {
  return(
    <div>
      {boulders.map((boulder) => (
        <div className="flex py-4 first-of-type:pt-0 items-center justify-center border-b last-of-type:border-none">
          <BoulderCard boulder={boulder} />
        </div>
      ))}
    </div>
  );
}