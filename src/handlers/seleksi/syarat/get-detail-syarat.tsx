"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailSyarat = (syaratId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailSyarat = async () => {
    try {
      const { data } = await axios.get(`/seleksi/syarats/${syaratId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-syarat", syaratId],
    queryFn: fetchDetailSyarat,
    enabled: false,
  });

  return { ...query };
};
