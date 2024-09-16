"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailKriteriaPenilaian = (kriteriaPenilaianId: number) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailKriteriaPenilaian = async () => {
    try {
      const { data } = await axios.get(
        `/sippm/kriteria-penilaians/${kriteriaPenilaianId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-kriteria-penilaian", kriteriaPenilaianId],
    queryFn: fetchDetailKriteriaPenilaian,
    enabled: false,
  });

  return { ...query };
};
