"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportSuku = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportSuku = async () => {
    try {
      const { data } = await axios.get(`/biodata/sukus/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-suku"],
    queryFn: exportSuku,
    enabled: false,
  });

  return { ...query };
};
