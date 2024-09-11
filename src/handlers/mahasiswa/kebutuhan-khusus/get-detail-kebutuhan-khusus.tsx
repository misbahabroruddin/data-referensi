"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailKebutuhanKhusus = (kebutuhanKhususId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailKebutuhanKhusus = async () => {
    try {
      const { data } = await axios.get(
        `/mahasiswa/kebutuhan-khususes/${kebutuhanKhususId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-kebutuhan-khusus", kebutuhanKhususId],
    queryFn: fetchDetailKebutuhanKhusus,
    enabled: false,
  });

  return { ...query };
};
