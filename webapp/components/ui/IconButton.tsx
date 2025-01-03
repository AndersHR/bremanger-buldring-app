"use client";

import React from "react";
import styles from "./ui.module.css";
import { useRouter } from "next/navigation";

export default function IconButton({
  type,
  icon,
  ariaLabel,
  handleClick,
  backgroundColor,
  width = "32px",
  height = "32px",
}: {
  type: Type;
  icon: string;
  ariaLabel: string;
  handleClick: () => void;
  backgroundColor?: string;
  width?: string;
  height?: string;
}) {
  return (
    <button
      onClick={handleClick}
      className={`${styles.iconButton}`}
      aria-label={ariaLabel}
      style={{
        backgroundColor: backgroundColor ?? "transparent",
        minHeight: height,
        minWidth: width,
      }}
    >
      <IconImage
        type={type}
        icon={icon}
        ariaLabel={ariaLabel}
        width={width}
        height={height}
      />
    </button>
  );
}

export function IconImage({
  type,
  icon,
  ariaLabel,
  width = "32px",
  height = "32px",
}: {
  type: Type;
  icon: string;
  ariaLabel: string;
  width?: string;
  height?: string;
}) {
  return (
    <img
      className={styles.iconButtonImage}
      src={`/softteal-${type}-color/${icon}`}
      alt={ariaLabel}
      style={{ width, height }}
    />
  );
}

export type Type = "primary" | "secondary" | "tertiary" | "white";

export function MenuButton({
  onClick,
  menuVisible,
}: {
  onClick: () => void;
  menuVisible: boolean;
}) {
  return (
    <IconButton
      type="tertiary"
      handleClick={onClick}
      icon={menuVisible ? "/icons8-close-96.png" : "/icons8-menu-96.png"}
      backgroundColor={menuVisible ? "var(--secondary-color-light)" : undefined}
      ariaLabel="Tilbake"
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
      icon="/icons8-customer-96.png"
      ariaLabel="Tilbake"
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
      type="tertiary"
      handleClick={handleLoginClick}
      icon="/icons8-login-96.png"
      ariaLabel="Logg inn"
    />
  );
}
