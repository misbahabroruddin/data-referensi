"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllRincianBiaya = (queryParams: QueryParamsRincianBiaya) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  let params: any = {
    page: queryParams.pageIndex + 1,
    per_page: queryParams.pageSize,
  };

  if (queryParams.rincian) {
    params = {
      ...params,
      rincian: queryParams.rincian,
      page: 1,
    };
  }

  const fetchAllRincianBiaya = async () => {
    try {
      const { data } = await axios.get("/sippm/rincian-biayas", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-rincian-biaya",
      params.page,
      params.per_page,
      params.nama,
    ],
    queryFn: fetchAllRincianBiaya,
    enabled: !!session.token,
  });

  return { ...query };
};
