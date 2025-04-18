"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import { Box, Flex, IconButton, Link, Skeleton, Text } from "@chakra-ui/react";
import { Group, Home, LogIn, LogOut, Menu, Plus, X } from "lucide-react";
import { useState } from "react";
import styles from "./navBar.module.css";

export default function NavBar() {
  const { user, isAdmin, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        {/* <NavItem icon={Mountain} label="Buldere" href="/" /> */}
        <NavItem icon={Group} label="Samlinger" href="/samling" />

        <Box borderBottom="2px solid white" width="100%" my="2" />

        {loading ? (
          <>
            {/* <NavItemSkeleton /> */}
            <NavItemSkeleton />
          </>
        ) : user ? (
          <>
            {/* <NavItem icon={User} label="Min side" href="/minside" /> */}
            <LogOutNavItem
              icon={LogOut}
              label="Logg ut"
              handleLogout={logout}
            />
            {isAdmin && (
              <>
                <Box borderBottom="2px solid white" width="100%" my="2" />
                <NavItem
                  icon={Plus}
                  label="Nytt bulder"
                  href="/bulder/opprett"
                />
              </>
            )}
          </>
        ) : (
          <NavItem icon={LogIn} label="Logg inn" href="/login" />
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

function NavItemSkeleton() {
  return <Skeleton height="40px" color="var(--secondary-color-light)" my="1" />;
}

function LogOutNavItem({
  icon,
  label,
  handleLogout,
}: {
  icon: React.ElementType;
  label: string;
  handleLogout: () => void;
}) {
  return (
    <Box
      className={styles.navItem}
      as="button"
      onClick={handleLogout}
      display="flex"
      alignItems="center"
    >
      <Box as={icon} />
      <Text>{label}</Text>
    </Box>
  );
}
