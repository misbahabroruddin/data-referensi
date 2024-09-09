import { useContext } from "react";

import {
  SidebarContext,
  SidebarContextType,
} from "../providers/sidebar-provider";

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
