"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailJenisProgram = (jenisProgramId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailJenisProgram = async () => {
    try {
      const { data } = await axios.get(
        `/pendaftaran/jenis-programs/${jenisProgramId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-jenis-program", jenisProgramId],
    queryFn: fetchDetailJenisProgram,
    enabled: false,
  });

  return { ...query };
};
