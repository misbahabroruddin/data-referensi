"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useExportAlmamater = () => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const exportAlmamater = async () => {
    try {
      const { data } = await axios.get(
        `/biodata/ukuran-jas-almamaters/export`,
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
    queryKey: ["export-data-ukuran-jas-almamater"],
    queryFn: exportAlmamater,
    enabled: false,
  });

  return { ...query };
};
