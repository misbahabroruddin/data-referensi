"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportDesa = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportDesa = async () => {
    try {
      const { data } = await axios.get(`/wilayah/desas/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-desa"],
    queryFn: exportDesa,
    enabled: false,
  });

  return { ...query };
};
