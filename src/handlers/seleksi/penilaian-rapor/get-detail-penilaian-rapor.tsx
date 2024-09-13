"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailPenilaianRapor = (penilaianRaporId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailPenilaianRapor = async () => {
    try {
      const { data } = await axios.get(
        `/seleksi/penilaian-rapors/${penilaianRaporId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-penilaian-rapor", penilaianRaporId],
    queryFn: fetchDetailPenilaianRapor,
    enabled: false,
  });

  return { ...query };
};
