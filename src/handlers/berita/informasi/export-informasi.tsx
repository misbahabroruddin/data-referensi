"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportInformasi = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportInformasi = async () => {
    try {
      const { data } = await axios.get(`/berita/informasis/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-informasi"],
    queryFn: exportInformasi,
    enabled: false,
  });

  return { ...query };
};
