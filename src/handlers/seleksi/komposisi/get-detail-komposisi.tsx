"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailKomposisi = (komposisiId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailKomposisi = async () => {
    try {
      const { data } = await axios.get(`/seleksi/komposisis/${komposisiId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-komposisi", komposisiId],
    queryFn: fetchDetailKomposisi,
    enabled: false,
  });

  return { ...query };
};
