"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailJenisSyarat = (jenisSyaratId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailJenisSyarat = async () => {
    try {
      const { data } = await axios.get(
        `/seleksi/jenis-syarats/${jenisSyaratId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-jenis-syarat", jenisSyaratId],
    queryFn: fetchDetailJenisSyarat,
    enabled: false,
  });

  return { ...query };
};
