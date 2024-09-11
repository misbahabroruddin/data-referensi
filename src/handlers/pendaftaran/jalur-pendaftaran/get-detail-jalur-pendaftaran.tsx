"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailJalurPendaftaran = (jalurPendaftaranId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailJalurPendaftaran = async () => {
    try {
      const { data } = await axios.get(
        `/pendaftaran/jalur-pendaftarans/${jalurPendaftaranId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-jalur-pendaftaran", jalurPendaftaranId],
    queryFn: fetchDetailJalurPendaftaran,
    enabled: false,
  });

  return { ...query };
};
