"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportProvinsi = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportProvinsi = async () => {
    try {
      const { data } = await axios.get(`/wilayah/provinsis/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-provinsi"],
    queryFn: exportProvinsi,
    enabled: false,
  });

  return { ...query };
};
