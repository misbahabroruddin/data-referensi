"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailDesa = (desaId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailDesa = async () => {
    try {
      const { data } = await axios.get(`/wilayah/desas/${desaId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-desa", desaId],
    queryFn: fetchDetailDesa,
    enabled: false,
  });

  return { ...query };
};
