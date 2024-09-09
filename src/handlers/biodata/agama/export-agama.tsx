"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportAgama = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportAgama = async () => {
    try {
      const { data } = await axios.get(`/biodata/agamas/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-agama"],
    queryFn: exportAgama,
    enabled: false,
  });

  return { ...query };
};
