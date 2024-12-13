"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./ui.module.css";

export default function BackButton() {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <button
      onClick={handleBackClick}
      className={styles.backButton}
      aria-label={"Tilbake"}
    >
      <img
        className={styles.backButtonIcon}
        src="/softteal/icons8-back-96.png"
      />
    </button>
  );
}
