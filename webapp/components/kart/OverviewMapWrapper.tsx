"use client";

import dynamic from "next/dynamic";

type Props = {
  height?: string;
  width?: string;
};

const OverviewMap = dynamic(() => import("./OverviewMap"), { ssr: false });

export default function OverviewMapWrapper({
  height = "400px",
  width = "800px",
}: Props) {
  return <OverviewMap height={height} width={width} />;
}
