"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportJalurPendaftaran = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportJalurPendaftaran = async () => {
    try {
      const { data } = await axios.get(
        `/pendaftaran/jalur-pendaftarans/export`,
        {
          responseType: "blob",
        },
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["export-data-jalur-pendaftaran"],
    queryFn: exportJalurPendaftaran,
    enabled: false,
  });

  return { ...query };
};
