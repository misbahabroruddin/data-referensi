"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailJabatanFungsional = (jabatanFungsionalId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailJabatanFungsional = async () => {
    try {
      const { data } = await axios.get(
        `/jabatan/jabatan-fungsionals/${jabatanFungsionalId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-jabatan-fungsional", jabatanFungsionalId],
    queryFn: fetchDetailJabatanFungsional,
    enabled: false,
  });

  return { ...query };
};
