"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

interface SessionType {
  token: string | undefined;
  refreshToken: string | undefined;
  expiredAt: string | Date | undefined;
}

export interface SessionContextType {
  session: SessionType;
  setToken: (token: string | undefined) => void;
  setRefreshToken: (refreshToken: string | undefined) => void;
  setExpiredAt: (expiredAt: string | undefined) => void;
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
};

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [token, setAccessToken] = useState(getInitialState);
  const [session, setSession] = useState<SessionType>(initialValues);

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

  const signOut = () => {
    if (typeof window !== "undefined") {
      setSession(initialValues);
      localStorage.clear();
      window.location.href = "https://sso.dev-unsia.id/backend/login";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token!);
    } else {
      window.location.href = "https://sso.dev-unsia.id/backend/login";
    }
  }, [session.token]);

  // useEffect(() => {}, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        setToken,
        setRefreshToken,
        setExpiredAt,
        signOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
