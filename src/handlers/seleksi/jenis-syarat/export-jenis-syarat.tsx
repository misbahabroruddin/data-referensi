"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportJenisSyarat = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportJenisSyarat = async () => {
    try {
      const { data } = await axios.get(`/seleksi/jenis-syarats/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-jenis-syarat"],
    queryFn: exportJenisSyarat,
    enabled: false,
  });

  return { ...query };
};
