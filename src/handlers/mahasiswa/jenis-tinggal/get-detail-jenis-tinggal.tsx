"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailJenisTinggal = (jenisTinggalId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailJenisTinggal = async () => {
    try {
      const { data } = await axios.get(
        `/mahasiswa/jenis-tinggals/${jenisTinggalId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-jenis-tinggal", jenisTinggalId],
    queryFn: fetchDetailJenisTinggal,
    enabled: false,
  });

  return { ...query };
};
