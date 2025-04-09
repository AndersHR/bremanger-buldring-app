"use client";

import { Pencil } from "lucide-react";
import { IconRedirectButton } from "./IconButton";

export default function EditButton({ href }: { href: string }) {
  return (
    <IconRedirectButton
      size="24px"
      color="var(--tertiary-color)"
      Icon={Pencil}
      href={href}
    />
  );
}
