"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailGelombang = (gelombangId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailGelombang = async () => {
    try {
      const { data } = await axios.get(
        `/pendaftaran/gelombangs/${gelombangId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-gelombang", gelombangId],
    queryFn: fetchDetailGelombang,
    enabled: false,
  });

  return { ...query };
};
