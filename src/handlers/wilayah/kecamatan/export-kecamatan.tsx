"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportKecamatan = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportKecamatan = async () => {
    try {
      const { data } = await axios.get(`/wilayah/kecamatans/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-kecamatan"],
    queryFn: exportKecamatan,
    enabled: false,
  });

  return { ...query };
};
