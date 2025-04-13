import dynamic from "next/dynamic";
import MapSkeleton from "./MapSkeleton";

const SingleBoulderMap = dynamic(() => import("./SingleBoulderMap"), {
  ssr: false,
  loading: () => <MapSkeleton height="400px" width="100%" />,
});

export default SingleBoulderMap;
