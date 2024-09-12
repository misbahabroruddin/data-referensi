"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportKomposisi = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportKomposisi = async () => {
    try {
      const { data } = await axios.get(`/seleksi/komposisis/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-komposisi"],
    queryFn: exportKomposisi,
    enabled: false,
  });

  return { ...query };
};
