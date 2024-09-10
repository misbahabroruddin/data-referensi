"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailPenghasilan = (penghasilanId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailPenghasilan = async () => {
    try {
      const { data } = await axios.get(
        `/biodata/penghasilans/${penghasilanId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-penghasilan", penghasilanId],
    queryFn: fetchDetailPenghasilan,
    enabled: false,
  });

  return { ...query };
};
