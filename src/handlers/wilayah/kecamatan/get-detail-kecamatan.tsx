"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailKecamatan = (kecamatanId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailKecamatan = async () => {
    try {
      const { data } = await axios.get(`/wilayah/kecamatans/${kecamatanId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-kecamatan", kecamatanId],
    queryFn: fetchDetailKecamatan,
    enabled: false,
  });

  return { ...query };
};
