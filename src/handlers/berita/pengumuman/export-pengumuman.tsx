"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportPengumuman = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportPengumuman = async () => {
    try {
      const { data } = await axios.get(`/berita/pengumumans/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-pengumuman"],
    queryFn: exportPengumuman,
    enabled: false,
  });

  return { ...query };
};
