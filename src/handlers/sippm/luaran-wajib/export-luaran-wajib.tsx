"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportLuaranWajib = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportLuaranWajib = async () => {
    try {
      const { data } = await axios.get(`/sippm/luaran-wajibs/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-luaran-wajib"],
    queryFn: exportLuaranWajib,
    enabled: false,
  });

  return { ...query };
};
