"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportGelombang = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportGelombang = async () => {
    try {
      const { data } = await axios.get(`/pendaftaran/gelombangs/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-gelombang"],
    queryFn: exportGelombang,
    enabled: false,
  });

  return { ...query };
};
