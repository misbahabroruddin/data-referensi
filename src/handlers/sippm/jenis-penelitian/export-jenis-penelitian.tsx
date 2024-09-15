"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportJenisPenelitian = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportJenisPenelitian = async () => {
    try {
      const { data } = await axios.get(`/sippm/jenis-penelitians/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-jenis-penelitian"],
    queryFn: exportJenisPenelitian,
    enabled: false,
  });

  return { ...query };
};
