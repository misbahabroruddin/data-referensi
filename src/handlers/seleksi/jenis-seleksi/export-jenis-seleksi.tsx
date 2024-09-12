"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportJenisSeleksi = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportJenisSeleksi = async () => {
    try {
      const { data } = await axios.get(`/seleksi/jenis-seleksis/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-jenis-seleksi"],
    queryFn: exportJenisSeleksi,
    enabled: false,
  });

  return { ...query };
};
