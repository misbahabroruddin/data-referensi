"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useSearchJalurPendaftaran = (limit = 1000) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  const fetchSearchJalurPendaftaran = async () => {
    try {
      const { data } = await axios.get("/pendaftaran/jalur-pendaftarans", {
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
    queryKey: ["get-search-jalur-pendaftaran", limit],
    queryFn: fetchSearchJalurPendaftaran,
    enabled: !!session.token,
  });

  return { ...query };
};
