"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailProvinsi = (provinsiId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailProvinsi = async () => {
    try {
      const { data } = await axios.get(`/wilayah/provinsis/${provinsiId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-provinsi", provinsiId],
    queryFn: fetchDetailProvinsi,
    enabled: false,
  });

  return { ...query };
};
