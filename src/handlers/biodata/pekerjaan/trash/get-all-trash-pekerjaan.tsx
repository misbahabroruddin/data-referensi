"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllTrashPekerjaan = (queryParams: QueryParamsPekerjaan) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  let params: any = {
    page: queryParams.pageIndex + 1,
    per_page: queryParams.pageSize,
  };

  if (queryParams.kategori) {
    params = {
      ...params,
      kategori: queryParams.kategori,
      page: 1,
    };
  }

  if (queryParams.deskripsi) {
    params = {
      ...params,
      kategori: null,
      deskripsi: queryParams.deskripsi,
      page: 1,
    };
  }

  const fetchAllPekerjaan = async () => {
    try {
      const { data } = await axios.get("/biodata/pekerjaans/trashs", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-trash-pekerjaan",
      params.page,
      params.per_page,
      params.kategori,
    ],
    queryFn: fetchAllPekerjaan,
    enabled: !!session.token,
  });

  return { ...query };
};
