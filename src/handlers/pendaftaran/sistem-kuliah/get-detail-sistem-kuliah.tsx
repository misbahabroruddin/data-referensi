"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailSistemKuliah = (sistemKuliahId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailSistemKuliah = async () => {
    try {
      const { data } = await axios.get(
        `/pendaftaran/sistem-kuliahs/${sistemKuliahId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-sistem-kuliah", sistemKuliahId],
    queryFn: fetchDetailSistemKuliah,
    enabled: false,
  });

  return { ...query };
};
