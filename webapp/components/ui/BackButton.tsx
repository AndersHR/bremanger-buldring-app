"use client";

import React from "react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function BackButton() {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <IconButton
      type="tertiary"
      handleClick={handleBackClick}
      icon="/icons8-back-96.png"
      ariaLabel="Tilbake"
      width="24px"
      height="24px"
    />
  );
}
