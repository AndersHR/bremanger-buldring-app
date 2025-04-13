"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SIDEBAR_STORAGE_KEY = "sidebarOpen";

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
      const stored = sessionStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (stored !== null) {
        setIsOpen(stored === "true");
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      sessionStorage.setItem(SIDEBAR_STORAGE_KEY, String(isOpen));
    }
  }, [isOpen, isInitialized]);

  return (
    <NavBarContext.Provider value={{ isOpen, setIsOpen }}>
      <div>{children}</div>
    </NavBarContext.Provider>
  );
}

export const useNavBar = () => useContext(NavBarContext);
