"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllTrashJenisTinggal = (
  queryParams: QueryParamsJenisTinggal,
) => {
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
      page: 1,
    };
  }

  if (queryParams.jenis_tinggal) {
    params = {
      ...params,
      kode: null,
      jenis_tinggal: queryParams.jenis_tinggal,
      page: 1,
    };
  }

  const fetchAllJenisTinggal = async () => {
    try {
      const { data } = await axios.get("/mahasiswa/jenis-tinggals/trashs", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-trash-jenis-tinggal",
      params.page,
      params.per_page,
      params.kode,
      params.jenis_tinggal,
    ],
    queryFn: fetchAllJenisTinggal,
    enabled: !!session.token,
  });

  return { ...query };
};
