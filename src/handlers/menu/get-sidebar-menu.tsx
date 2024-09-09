"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxiosSSO } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetSidebarMenu = (appId: string) => {
  const axios = useAxiosSSO();
  const { session } = useSession();
  const { errorHandler } = useErrorHandling();

  const fetchSidebarMenu = async () => {
    try {
      const { data } = await axios.get(`/dashboard/menus/${appId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["sidebar-menu"],
    queryFn: fetchSidebarMenu,
    enabled: !!session.token && !!appId,
  });

  return { ...query };
};
