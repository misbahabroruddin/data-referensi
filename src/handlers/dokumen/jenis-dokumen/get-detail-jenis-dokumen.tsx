"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailJenisDokumen = (jenisDokumenId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailJenisDokumen = async () => {
    try {
      const { data } = await axios.get(
        `/dokumen/jenis-dokumens/${jenisDokumenId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-jenis-dokumen", jenisDokumenId],
    queryFn: fetchDetailJenisDokumen,
    enabled: false,
  });

  return { ...query };
};
