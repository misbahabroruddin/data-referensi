import { useContext } from "react";

import {
  SessionContext,
  SessionContextType,
} from "../providers/session-provider";

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
