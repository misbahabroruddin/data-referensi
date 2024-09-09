"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportNegara = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportNegara = async () => {
    try {
      const { data } = await axios.get(`/wilayah/negaras/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-negara"],
    queryFn: exportNegara,
    enabled: false,
  });

  return { ...query };
};
