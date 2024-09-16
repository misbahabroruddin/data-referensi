"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllSumberInformasi = (
  queryParams: QueryParamsSumberInformasi,
) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  let params: any = {
    page: queryParams.pageIndex + 1,
    per_page: queryParams.pageSize,
  };

  if (queryParams.sumber_informasi) {
    params = {
      ...params,
      sumber_informasi: queryParams.sumber_informasi,
      page: 1,
    };
  }

  const fetchAllSumberInformasi = async () => {
    try {
      const { data } = await axios.get("/marketing/sumber-informasis", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-sumber-informasi",
      params.page,
      params.per_page,
      params.sumber_informasi,
    ],
    queryFn: fetchAllSumberInformasi,
    enabled: !!session.token,
  });

  return { ...query };
};
