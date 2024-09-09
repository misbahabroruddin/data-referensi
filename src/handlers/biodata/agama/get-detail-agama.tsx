"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailAgama = (agamaId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailAgama = async () => {
    try {
      const { data } = await axios.get(`/biodata/agamas/${agamaId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-agama", agamaId],
    queryFn: fetchDetailAgama,
    enabled: false,
  });

  return { ...query };
};
