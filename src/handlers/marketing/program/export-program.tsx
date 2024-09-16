"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportProgram = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportProgram = async () => {
    try {
      const { data } = await axios.get(`/marketing/programs/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-program"],
    queryFn: exportProgram,
    enabled: false,
  });

  return { ...query };
};
