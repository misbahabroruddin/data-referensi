"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportJenisTinggal = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportJenisTinggal = async () => {
    try {
      const { data } = await axios.get(`/mahasiswa/jenis-tinggals/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-jenis-tinggal"],
    queryFn: exportJenisTinggal,
    enabled: false,
  });

  return { ...query };
};
