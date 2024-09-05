"use client";

import { useEffect } from "react";

import { axiosClient } from "../axios";
import { useSession } from "./use-session";

export const useAxios = () => {
  const { session } = useSession();

  useEffect(() => {
    if (session.token) {
      const axiosIntercept = axiosClient.interceptors.request.use((config) => {
        config.headers["Authorization"] = `Bearer ${session?.token}`;
        return config;
      });
      return () => {
        axiosClient.interceptors.request.eject(axiosIntercept);
      };
    }
  }, [session.token]);

  return axiosClient;
};
