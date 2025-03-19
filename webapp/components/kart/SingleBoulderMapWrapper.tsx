import dynamic from "next/dynamic";

const SingleBoulderMap = dynamic(() => import("./SingleBoulderMap"), {
  ssr: false,
});

export default SingleBoulderMap;
