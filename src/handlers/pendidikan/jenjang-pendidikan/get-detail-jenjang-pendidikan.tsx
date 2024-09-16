"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailJenjangPendidikan = (jenjangPendidikanId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailJenjangPendidikan = async () => {
    try {
      const { data } = await axios.get(
        `/pendidikan/jenjang-pendidikans/${jenjangPendidikanId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-jenjang-pendidikan", jenjangPendidikanId],
    queryFn: fetchDetailJenjangPendidikan,
    enabled: false,
  });

  return { ...query };
};
