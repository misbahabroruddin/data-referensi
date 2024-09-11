"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportSistemKuliah = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportSistemKuliah = async () => {
    try {
      const { data } = await axios.get(`/pendaftaran/sistem-kuliahs/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-sistem-kuliah"],
    queryFn: exportSistemKuliah,
    enabled: false,
  });

  return { ...query };
};
