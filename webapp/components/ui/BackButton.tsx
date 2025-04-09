"use client";

import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function BackButton() {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <IconButton
      size={"24px"}
      color={"var(--tertiary-color)"}
      onClick={handleBackClick}
      Icon={ArrowLeftCircle}
    />
  );
}
