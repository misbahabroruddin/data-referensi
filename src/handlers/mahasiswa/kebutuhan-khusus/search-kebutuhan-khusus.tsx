"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useSearchKebutuhanKhusus = (limit = 1000) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  const fetchSearchKebutuhanKhusus = async () => {
    try {
      const { data } = await axios.get("/mahasiswa/kebutuhan-khususes", {
        params: {
          limit,
        },
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-search-kebutuhan-khusus", limit],
    queryFn: fetchSearchKebutuhanKhusus,
    enabled: !!session.token,
  });

  return { ...query };
};
