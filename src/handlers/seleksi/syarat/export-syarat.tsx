"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportSyarat = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportSyarat = async () => {
    try {
      const { data } = await axios.get(`/seleksi/syarats/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-syarat"],
    queryFn: exportSyarat,
    enabled: false,
  });

  return { ...query };
};
