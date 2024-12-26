"use client";

import styles from "./ui.module.css";
import { LoginButton, MenuButton, ProfileButton } from "./IconButton";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import NavBar from "./NavBar";

export default function Header({ userData }: { userData: User | null }) {
  const [menuVisible, setMenuVisible] = useState(false);
  function onMenuClick() {
    setMenuVisible(!menuVisible);
  }

  return (
    <div>
      <header className={styles.header}>
        <MenuButton onClick={onMenuClick} menuVisible={menuVisible} />
        <a href="/">
          <h1>BULDRING I BREMANGER</h1>
        </a>
        {userData ? <ProfileButton /> : <LoginButton />}
      </header>
      <NavBar isVisible={menuVisible} />
    </div>
  );
}
