"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useSearchAlmamater = (limit = 1000) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  const fetchSearchAlmamater = async () => {
    try {
      const { data } = await axios.get("/biodata/ukuran-jas-almamaters", {
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
    queryKey: ["get-search-ukuran-jas-almamater", limit],
    queryFn: fetchSearchAlmamater,
    enabled: !!session.token,
  });

  return { ...query };
};
