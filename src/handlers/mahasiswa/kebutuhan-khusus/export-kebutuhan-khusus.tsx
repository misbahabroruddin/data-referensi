"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportKebutuhanKhusus = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportKebutuhanKhusus = async () => {
    try {
      const { data } = await axios.get(`/mahasiswa/kebutuhan-khususes/export`, {
        responseType: "blob",
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-kebutuhan-khusus"],
    queryFn: exportKebutuhanKhusus,
    enabled: false,
  });

  return { ...query };
};
