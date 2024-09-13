"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useSearchRaporPenilaian = (limit = 1000) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  const fetchSearchRaporPenilaian = async () => {
    try {
      const { data } = await axios.get("/seleksi/rapor-penilaians", {
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
    queryKey: ["get-search-rapor-penilaian", limit],
    queryFn: fetchSearchRaporPenilaian,
    enabled: !!session.token,
  });

  return { ...query };
};
