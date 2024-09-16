"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportKomponenPenilaian = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportKomponenPenilaian = async () => {
    try {
      const { data } = await axios.get(`/sippm/komponen-penilaians/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-komponen-penilaian"],
    queryFn: exportKomponenPenilaian,
    enabled: false,
  });

  return { ...query };
};
