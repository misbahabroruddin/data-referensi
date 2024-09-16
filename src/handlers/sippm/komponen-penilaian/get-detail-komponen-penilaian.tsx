"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailKomponenPenilaian = (komponenPenilaianId: number) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailKomponenPenilaian = async () => {
    try {
      const { data } = await axios.get(
        `/sippm/komponen-penilaians/${komponenPenilaianId}`,
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-komponen-penilaian", komponenPenilaianId],
    queryFn: fetchDetailKomponenPenilaian,
    enabled: false,
  });

  return { ...query };
};
