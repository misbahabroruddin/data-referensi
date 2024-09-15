"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailJenisPenelitian = (jenisPenelitianId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailJenisPenelitian = async () => {
    try {
      const { data } = await axios.get(
        `/sippm/jenis-penelitians/${jenisPenelitianId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-jenis-penelitian", jenisPenelitianId],
    queryFn: fetchDetailJenisPenelitian,
    enabled: false,
  });

  return { ...query };
};
