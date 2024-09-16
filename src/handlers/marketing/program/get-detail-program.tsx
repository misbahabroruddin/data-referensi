"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailProgram = (programId: number) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailProgram = async () => {
    try {
      const { data } = await axios.get(`/marketing/programs/${programId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-program", programId],
    queryFn: fetchDetailProgram,
    enabled: false,
  });

  return { ...query };
};
