import Image from "next/image";
import { BoulderCard, SingleBoulderCard } from "./ui/boulder-card";
import { fetchBoulderById } from "./lib/data";
import { BoulderTable } from "./ui/boulder-table";

export default async function Home() {

  const boulder = await fetchBoulderById("1");

  return (
    <div>
      {/*
      <div className="grid grid-cols-1 items-center place-items-center">
        <SingleBoulderCard boulder={boulder} />
      </div>
      */}

      <div className="grid grid-cols-1 items-center justify-items-center">
        <BoulderTable boulders={[boulder, boulder]} />
      </div>
    </div>
  );
}
