"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailKabupaten = (kabupatenId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailKabupaten = async () => {
    try {
      const { data } = await axios.get(`/wilayah/kabupatens/${kabupatenId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-kabupaten", kabupatenId],
    queryFn: fetchDetailKabupaten,
    enabled: false,
  });

  return { ...query };
};
