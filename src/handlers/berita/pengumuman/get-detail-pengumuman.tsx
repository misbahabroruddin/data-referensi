"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailPengumuman = (pengumumanId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailPengumuman = async () => {
    try {
      const { data } = await axios.get(`/berita/pengumumans/${pengumumanId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-pengumuman", pengumumanId],
    queryFn: fetchDetailPengumuman,
    enabled: false,
  });

  return { ...query };
};
