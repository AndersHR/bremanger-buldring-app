import dynamic from "next/dynamic";
import MapSkeleton from "./MapSkeleton";

const BoulderCollectionMap = dynamic(() => import("./BoulderCollectionMap"), {
  ssr: false,
  loading: () => <MapSkeleton height="400px" width="100%" />,
});

export default BoulderCollectionMap;
