"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportPekerjaan = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportPekerjaan = async () => {
    try {
      const { data } = await axios.get(`/biodata/pekerjaans/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-pekerjaan"],
    queryFn: exportPekerjaan,
    enabled: false,
  });

  return { ...query };
};
