"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailTransportasi = (transportasiId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailTransportasi = async () => {
    try {
      const { data } = await axios.get(
        `/mahasiswa/transportasis/${transportasiId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-transportasi", transportasiId],
    queryFn: fetchDetailTransportasi,
    enabled: false,
  });

  return { ...query };
};
