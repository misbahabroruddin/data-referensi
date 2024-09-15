"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportJenisDokumen = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportJenisDokumen = async () => {
    try {
      const { data } = await axios.get(`/dokumen/jenis-dokumens/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-jenis-dokumen"],
    queryFn: exportJenisDokumen,
    enabled: false,
  });

  return { ...query };
};
