"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportKriteriaPenilaian = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportKriteriaPenilaian = async () => {
    try {
      const { data } = await axios.get(`/sippm/kriteria-penilaians/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-kriteria-penilaian"],
    queryFn: exportKriteriaPenilaian,
    enabled: false,
  });

  return { ...query };
};
