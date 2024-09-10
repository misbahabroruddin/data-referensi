"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailSuku = (sukuId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailSuku = async () => {
    try {
      const { data } = await axios.get(`/biodata/sukus/${sukuId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-suku", sukuId],
    queryFn: fetchDetailSuku,
    enabled: false,
  });

  return { ...query };
};
