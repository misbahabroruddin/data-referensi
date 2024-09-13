"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useSearchPengumuman = (limit = 1000) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  const fetchSearchPengumuman = async () => {
    try {
      const { data } = await axios.get("/berita/pengumumans", {
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
    queryKey: ["get-search-pengumuman", limit],
    queryFn: fetchSearchPengumuman,
    enabled: !!session.token,
  });

  return { ...query };
};