"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailRincianBiaya = (rincianBiayaId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailRincianBiaya = async () => {
    try {
      const { data } = await axios.get(
        `/sippm/rincian-biayas/${rincianBiayaId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-rincian-biaya", rincianBiayaId],
    queryFn: fetchDetailRincianBiaya,
    enabled: false,
  });

  return { ...query };
};
