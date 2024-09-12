"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportJenisProgram = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportJenisProgram = async () => {
    try {
      const { data } = await axios.get(`/pendaftaran/jenis-programs/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-jenis-program"],
    queryFn: exportJenisProgram,
    enabled: false,
  });

  return { ...query };
};
