"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportKabupaten = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportKabupaten = async () => {
    try {
      const { data } = await axios.get(`/wilayah/kabupatens/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-kabupaten"],
    queryFn: exportKabupaten,
    enabled: false,
  });

  return { ...query };
};
