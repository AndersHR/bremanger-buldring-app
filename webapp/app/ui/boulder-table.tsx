import { Boulder } from '../lib/definitions';
import { BoulderCard } from '../ui/boulder-card';

export function BoulderTable({ boulders }: { boulders: Boulder[] }) {
  return(
    <div>
      {boulders.map((boulder) => (
        <div className="flex py-4 items-center justify-between border-b last-of-type:border-none">
          <BoulderCard boulder={boulder} />
        </div>
      ))}
    </div>
  );
}