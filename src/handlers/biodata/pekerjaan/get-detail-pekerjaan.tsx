"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailPekerjaan = (pekerjaanId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailPekerjaan = async () => {
    try {
      const { data } = await axios.get(`/biodata/pekerjaans/${pekerjaanId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-pekerjaan", pekerjaanId],
    queryFn: fetchDetailPekerjaan,
    enabled: false,
  });

  return { ...query };
};
