"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailSumberInformasi = (sumberInformasiId: number) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailSumberInformasi = async () => {
    try {
      const { data } = await axios.get(
        `/marketing/sumber-informasis/${sumberInformasiId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-sumber-informasi", sumberInformasiId],
    queryFn: fetchDetailSumberInformasi,
    enabled: false,
  });

  return { ...query };
};
