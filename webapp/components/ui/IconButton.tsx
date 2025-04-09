"use client";

import { IconButton as ChakraIconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import styles from "./ui.module.css";

export default function IconButton({
  color,
  size,
  Icon,
  ariaLabel,
  onClick,
}: {
  color: string;
  size: string;
  ariaLabel: string;
  Icon: React.ElementType;
  onClick: () => void;
}) {
  return (
    <ChakraIconButton
      className={styles.iconButton}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon style={{ width: size, height: size }} color={color} />
    </ChakraIconButton>
  );
}

export function IconRedirectButton({
  href,
  color,
  size,
  ariaLabel,
  Icon,
}: {
  href: string;
  color: string;
  size: string;
  ariaLabel: string;
  Icon: React.ElementType;
}) {
  const router = useRouter();
  return (
    <IconButton
      size={size}
      color={color}
      Icon={Icon}
      ariaLabel={ariaLabel}
      onClick={() => router.push(href)}
    />
  );
}
