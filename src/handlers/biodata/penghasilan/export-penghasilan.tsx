"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportPenghasilan = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportPenghasilan = async () => {
    try {
      const { data } = await axios.get(`/biodata/penghasilans/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-penghasilan"],
    queryFn: exportPenghasilan,
    enabled: false,
  });

  return { ...query };
};
