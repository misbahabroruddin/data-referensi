"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailNegara = (negaraId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailNegara = async () => {
    try {
      const { data } = await axios.get(`/wilayah/negaras/${negaraId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-negara", negaraId],
    queryFn: fetchDetailNegara,
    enabled: false,
  });

  return { ...query };
};
