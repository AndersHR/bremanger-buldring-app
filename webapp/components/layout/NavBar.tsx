"use client";

import { createClient } from "@/lib/supabase/supabaseClient";
import { Box, Flex, IconButton, Link, Text } from "@chakra-ui/react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Group, Home, LogOut, Menu, Mountain, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./navBar.module.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <Box
      position="fixed"
      top="0"
      left={isOpen ? "0" : "-250px"} // Slide in from left
      width="250px"
      height="100vh"
      bg="var(--secondary-color)"
      color="white"
      transition="left 0.3s ease-in-out" // Smooth slide transition
      zIndex="50" // Layer it above the content
      boxShadow="md"
      p="4"
      borderRight="4px solid var(--quaternary-color)" // Right border when open
      className={styles.sidebar} // Use CSS Module for styling
    >
      <IconButton
        aria-label="Toggle Sidebar"
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        transition="left 0.3s ease-in-out"
        left={isOpen ? "248px" : "-2px"}
        top="4"
        zIndex="100"
        bg="var(--primary-color)"
        className={styles.menuButton} // Use CSS Module for styling
      >
        {isOpen ? (
          <X color="var(--secondary-color)" />
        ) : (
          <Menu color="var(--secondary-color)" />
        )}
      </IconButton>
      <Flex direction="column" gap=".5">
        <NavItem icon={Home} label="Hjem" href="/" />
        <NavItem icon={Mountain} label="Buldere" href="/" />
        <NavItem icon={Group} label="Samlinger" href="/samling" />

        {user && <Box borderBottom="2px solid white" width="100%" my="2" />}

        {user && (
          <>
            <NavItem icon={User} label="Min side" href="/minside" />
            <NavItem icon={LogOut} label="Logg ut" href="/minside" />
          </>
        )}
      </Flex>
    </Box>
  );
}

function NavItem({
  icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  return (
    <Link className={styles.navItem} href={href}>
      <Box as={icon} />
      <Text>{label}</Text>
    </Link>
  );
}
