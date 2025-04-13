// components/kart/MapSkeleton.tsx
"use client";

import { Box, Skeleton } from "@chakra-ui/react";

const MapSkeleton = ({ height, width }: { height: string; width: string }) => {
  return (
    <Box height={height} width={width} borderRadius="md" overflow="hidden">
      <Skeleton height="100%" width="100%" />
    </Box>
  );
};

export default MapSkeleton;
