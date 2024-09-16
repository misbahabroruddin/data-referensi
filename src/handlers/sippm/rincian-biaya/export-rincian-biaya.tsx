"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportRincianBiaya = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportRincianBiaya = async () => {
    try {
      const { data } = await axios.get(`/sippm/rincian-biayas/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-rincian-biaya"],
    queryFn: exportRincianBiaya,
    enabled: false,
  });

  return { ...query };
};
