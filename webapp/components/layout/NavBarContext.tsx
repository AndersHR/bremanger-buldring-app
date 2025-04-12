"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SIDEBAR_COOKIE_NAME = "sidebarOpen";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week

const NavBarContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export function NavBarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const cookies = document.cookie.split(";");
      const sidebarCookie = cookies.find((cookie) =>
        cookie.trim().startsWith(`${SIDEBAR_COOKIE_NAME}=`)
      );

      if (sidebarCookie) {
        const sidebarState = sidebarCookie.split("=")[1];
        setIsOpen(sidebarState === "true");
      }

      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${isOpen}; max-age=${SIDEBAR_COOKIE_MAX_AGE}; path=/;`;
    }
  }, [isOpen, isInitialized]);

  return (
    <NavBarContext.Provider value={{ isOpen, setIsOpen }}>
      <div>{children}</div>
    </NavBarContext.Provider>
  );
}

export const useNavBar = () => useContext(NavBarContext);
