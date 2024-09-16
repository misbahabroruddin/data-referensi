"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportJenjangPendidikan = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportJenjangPendidikan = async () => {
    try {
      const { data } = await axios.get(
        `/pendidikan/jenjang-pendidikans/export`,
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
    queryKey: ["export-data-jenjang-pendidikan"],
    queryFn: exportJenjangPendidikan,
    enabled: false,
  });

  return { ...query };
};
