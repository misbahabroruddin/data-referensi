"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailJenisSeleksi = (jenisSeleksiId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailJenisSeleksi = async () => {
    try {
      const { data } = await axios.get(
        `/seleksi/jenis-seleksis/${jenisSeleksiId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-jenis-seleksi", jenisSeleksiId],
    queryFn: fetchDetailJenisSeleksi,
    enabled: false,
  });

  return { ...query };
};
