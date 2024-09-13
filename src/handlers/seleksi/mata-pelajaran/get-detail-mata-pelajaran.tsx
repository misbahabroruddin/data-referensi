"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailMataPelajaran = (mataPejaranId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailMataPelajaran = async () => {
    try {
      const { data } = await axios.get(
        `/seleksi/mata-pelajarans/${mataPejaranId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-mata-pelajaran", mataPejaranId],
    queryFn: fetchDetailMataPelajaran,
    enabled: false,
  });

  return { ...query };
};
