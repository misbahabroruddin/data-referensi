"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllTrashJenisSeleksi = (
  queryParams: QueryParamsJenisSeleksi,
) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  let params: any = {
    page: queryParams.pageIndex + 1,
    per_page: queryParams.pageSize,
  };

  if (queryParams.nama) {
    params = {
      ...params,
      nama: queryParams.nama,
      kode: null,
      page: 1,
    };
  }
  if (queryParams.kode) {
    params = {
      ...params,
      kode: queryParams.kode,
      nama: null,
      page: 1,
    };
  }

  const fetchAllJenisSeleksi = async () => {
    try {
      const { data } = await axios.get("/seleksi/jenis-seleksis/trashs", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-trash-jenis-seleksi",
      params.page,
      params.per_page,
      params.kode,
      params.nama,
    ],
    queryFn: fetchAllJenisSeleksi,
    enabled: !!session.token,
  });

  return { ...query };
};
