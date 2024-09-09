"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxiosSSO } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetProfileUser = () => {
  const axios = useAxiosSSO();
  const { session } = useSession();
  const { errorHandler } = useErrorHandling();

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("/user/profile");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: !!session.token,
  });

  return { ...query };
};
