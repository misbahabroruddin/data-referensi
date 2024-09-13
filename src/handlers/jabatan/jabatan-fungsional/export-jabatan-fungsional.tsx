"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportJabatanFungsional = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportJabatanFungsional = async () => {
    try {
      const { data } = await axios.get(`/jabatan/jabatan-fungsionals/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-jabatan-fungsional"],
    queryFn: exportJabatanFungsional,
    enabled: false,
  });

  return { ...query };
};
