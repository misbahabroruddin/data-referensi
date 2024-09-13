"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportPenilaianRapor = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportPenilaianRapor = async () => {
    try {
      const { data } = await axios.get(`/seleksi/penilaian-rapors/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-penilaian-rapor"],
    queryFn: exportPenilaianRapor,
    enabled: false,
  });

  return { ...query };
};
