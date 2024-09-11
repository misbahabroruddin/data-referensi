"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportTransportasi = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportTransportasi = async () => {
    try {
      const { data } = await axios.get(`/mahasiswa/transportasis/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-transportasi"],
    queryFn: exportTransportasi,
    enabled: false,
  });

  return { ...query };
};
