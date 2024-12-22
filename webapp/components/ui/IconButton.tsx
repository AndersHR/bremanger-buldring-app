"use client";

import React from "react";
import styles from "./ui.module.css";
import { useRouter } from "next/navigation";

export default function IconButton({
  type,
  icon,
  ariaLabel,
  handleClick,
  width = "24px",
  height = "24px",
}: {
  type: Type;
  icon: string;
  ariaLabel: string;
  handleClick: () => void;
  width?: string;
  height?: string;
}) {
  return (
    <button
      onClick={handleClick}
      className={styles.iconButton}
      aria-label={ariaLabel}
      style={{ width, height }}
    >
      <img
        className={styles.iconButtonImage}
        src={`/softteal-${type}-color/${icon}`}
        alt={ariaLabel}
      />
    </button>
  );
}

export type Type = "primary" | "secondary" | "tertiary" | "white";

export function MenuButton() {
  const handleMenuClick = () => {
    console.log("Menu clicked");
  };
  return (
    <IconButton
      type="tertiary"
      handleClick={handleMenuClick}
      icon="/icons8-menu-96-outline.png"
      ariaLabel="Tilbake"
      width="24px"
      height="24px"
    />
  );
}

export function ProfileButton() {
  const router = useRouter();
  const handleProfileClick = () => {
    router.push("/minside");
  };
  return (
    <IconButton
      type="tertiary"
      handleClick={handleProfileClick}
      icon="/icons8-customer-96-outline.png"
      ariaLabel="Tilbake"
      width="24px"
      height="24px"
    />
  );
}

export function LoginButton() {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };
  return (
    <IconButton
      type="secondary"
      handleClick={handleLoginClick}
      icon="/icons8-login-96.png"
      ariaLabel="Logg inn"
      width="24px"
      height="24px"
    />
  );
}
