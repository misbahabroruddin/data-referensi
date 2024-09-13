"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportMataPelajaran = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportMataPelajaran = async () => {
    try {
      const { data } = await axios.get(`/seleksi/mata-pelajarans/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-mata-pelajaran"],
    queryFn: exportMataPelajaran,
    enabled: false,
  });

  return { ...query };
};
