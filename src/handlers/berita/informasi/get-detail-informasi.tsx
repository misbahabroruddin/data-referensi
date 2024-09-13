"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailInformasi = (informasiId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailInformasi = async () => {
    try {
      const { data } = await axios.get(`/berita/informasis/${informasiId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-informasi", informasiId],
    queryFn: fetchDetailInformasi,
    enabled: false,
  });

  return { ...query };
};
