"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllSistemKuliah = (queryParams: QueryParamsSistemKuliah) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  let params: any = {
    page: queryParams.pageIndex + 1,
    per_page: queryParams.pageSize,
  };

  if (queryParams.sistem_kuliah) {
    params = {
      ...params,
      sistem_kuliah: queryParams.sistem_kuliah,
      page: 1,
    };
  }

  const fetchAllSistemKuliah = async () => {
    try {
      const { data } = await axios.get("/pendaftaran/sistem-kuliahs", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-sistem-kuliah",
      params.page,
      params.per_page,
      params.sistem_kuliah,
    ],
    queryFn: fetchAllSistemKuliah,
    enabled: !!session.token,
  });

  return { ...query };
};
