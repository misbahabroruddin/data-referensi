"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportSumberInformasi = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportSumberInformasi = async () => {
    try {
      const { data } = await axios.get(`/marketing/sumber-informasis/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-sumber-informasi"],
    queryFn: exportSumberInformasi,
    enabled: false,
  });

  return { ...query };
};
