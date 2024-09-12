"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllJenisSeleksi = (queryParams: QueryParamsJenisSeleksi) => {
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
      const { data } = await axios.get("/seleksi/jenis-seleksis", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-jenis-seleksi",
      params.page,
      params.per_page,
      params.nama,
      params.kode,
    ],
    queryFn: fetchAllJenisSeleksi,
    enabled: !!session.token,
  });

  return { ...query };
};
