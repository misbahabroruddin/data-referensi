"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllKomposisi = (queryParams: QueryParamsKomposisi) => {
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
      komposisi: null,
      page: 1,
    };
  }

  if (queryParams.komposisi) {
    params = {
      ...params,
      kode: null,
      komposisi: queryParams.komposisi,
      page: 1,
    };
  }

  const fetchAllKomposisi = async () => {
    try {
      const { data } = await axios.get("/seleksi/komposisis", { params });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-komposisi",
      params.page,
      params.per_page,
      params.kode,
      params.komposisi,
    ],
    queryFn: fetchAllKomposisi,
    enabled: !!session.token,
  });

  return { ...query };
};
