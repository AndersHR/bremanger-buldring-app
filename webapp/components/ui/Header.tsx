import styles from "./ui.module.css";
import { LoginButton, MenuButton, ProfileButton } from "./IconButton";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) console.error(error);

  return (
    <header className={styles.header}>
      <MenuButton />
      <a href="/">
        <h1>BULDRING I BREMANGER</h1>
      </a>
      {data?.user ? <ProfileButton /> : <LoginButton />}
    </header>
  );
}
