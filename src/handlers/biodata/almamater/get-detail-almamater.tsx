"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailAlmamater = (ukuranJasAlmamaterId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailAlmamater = async () => {
    try {
      const { data } = await axios.get(
        `/biodata/ukuran-jas-almamaters/${ukuranJasAlmamaterId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-ukuran-jas-almamater", ukuranJasAlmamaterId],
    queryFn: fetchDetailAlmamater,
    enabled: false,
  });

  return { ...query };
};
