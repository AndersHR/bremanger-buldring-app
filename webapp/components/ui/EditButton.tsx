"use client";

import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function EditButton({ href }: { href: string }) {
  const router = useRouter();
  return (
    <IconButton
      type="tertiary"
      icon="/icons8-edit-96.png"
      handleClick={() => {
        router.push(href);
      }}
      ariaLabel="Rediger bulder"
      width="24px"
      height="24px"
    />
  );
}
