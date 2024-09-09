"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface SessionType {
  token: string | undefined;
  refreshToken: string | undefined;
  expiredAt: string | Date | undefined;
  roleId: string | undefined;
  appId: string | undefined;
}

export interface SessionContextType {
  session: SessionType;
  setToken: (token: string | undefined) => void;
  setRefreshToken: (refreshToken: string | undefined) => void;
  setExpiredAt: (expiredAt: string | undefined) => void;
  setRole: (roleId: string | undefined) => void;
  setApp: (appId: string | undefined) => void;
  signOut: () => void;
}

// context for session
export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);

const initialValues: SessionType = {
  token: undefined,
  refreshToken: undefined,
  expiredAt: undefined,
  roleId: undefined,
  appId: undefined,
};

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<SessionType>(initialValues);

  const router = useRouter();

  const setToken = (token: string | undefined) => {
    setSession((prev) => ({ ...prev, token }));
    if (token) localStorage.setItem("token", token!);
  };

  const setRefreshToken = (refreshToken: string | undefined) => {
    setSession((prev) => ({ ...prev, refreshToken }));
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken!);
  };

  const setExpiredAt = (expiredAt: string | undefined) => {
    setSession((prev) => ({ ...prev, expiredAt }));
    if (expiredAt) localStorage.setItem("expiredAt", expiredAt!);
  };

  const setRole = (roleId: string | undefined) => {
    setSession((prev) => ({ ...prev, roleId }));
    if (roleId) localStorage.setItem("role", roleId!);
  };

  const setApp = (appId: string | undefined) => {
    setSession((prev) => ({ ...prev, appId }));
    if (appId) localStorage.setItem("app", appId!);
  };

  const signOut = () => {
    if (typeof window !== "undefined") {
      setSession(initialValues);
      localStorage.clear();
      window.location.href = "https://sso.dev-unsia.id/backend/login";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const app = localStorage.getItem("app");

    if (token && role && app) {
      setToken(token!);
      setRole(role!);
      setApp(app!);
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_SSO_BASE_URL}/backend/login`;
    }
  }, [session.token]);

  return (
    <SessionContext.Provider
      value={{
        session,
        setToken,
        setRefreshToken,
        setExpiredAt,
        setRole,
        setApp,
        signOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
