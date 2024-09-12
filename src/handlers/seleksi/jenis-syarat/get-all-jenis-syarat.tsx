"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllJenisSyarat = (queryParams: QueryParamsJenisSyarat) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  let params: any = {
    page: queryParams.pageIndex + 1,
    per_page: queryParams.pageSize,
  };

  if (queryParams.kode) {
    params = {
      ...params,
      kode: queryParams.kode,
      jenis_syarat: null,
      page: 1,
    };
  }

  if (queryParams.jenis_syarat) {
    params = {
      ...params,
      kode: null,
      jenis_syarat: queryParams.jenis_syarat,
      page: 1,
    };
  }

  const fetchAllJenisSyarat = async () => {
    try {
      const { data } = await axios.get("/seleksi/jenis-syarats", { params });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-jenis-syarat",
      params.page,
      params.per_page,
      params.kode,
      params.jenis_syarat,
    ],
    queryFn: fetchAllJenisSyarat,
    enabled: !!session.token,
  });

  return { ...query };
};
