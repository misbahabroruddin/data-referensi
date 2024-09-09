"use client";

import React, { createContext, useState, useCallback, useEffect } from "react";

export interface SidebarContextType {
  isSidebarExpand: boolean;
  toggleSidebar: () => void;
  isSidebarMobileExpand: boolean;
  toggleSidebarMobile: () => void;
}

type SidebarProviderProps = {
  children: React.ReactNode;
};

// Create a context
export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isSidebarExpand, setIsOpen] = useState<boolean>(true);
  const [isSidebarMobileExpand, setIsSidebarMobileOpen] =
    useState<boolean>(false);
  const [windowSize, setWindowSize] = useState(0);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleSidebarMobile = useCallback(() => {
    setIsSidebarMobileOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (windowSize >= 1140) {
        setWindowSize(window.innerWidth);
        setIsOpen(true);
        setIsSidebarMobileOpen(true);
      } else {
        setWindowSize(window.innerWidth);
        setIsOpen(false);
        setIsSidebarMobileOpen(false);
      }
    });

    setWindowSize(window.innerWidth);
  }, [windowSize]);

  const contextValue: SidebarContextType = {
    isSidebarExpand,
    toggleSidebar,
    isSidebarMobileExpand,
    toggleSidebarMobile,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};
