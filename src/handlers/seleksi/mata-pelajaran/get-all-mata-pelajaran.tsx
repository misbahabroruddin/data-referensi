"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllMataPelajaran = (
  queryParams: QueryParamsMataPelajaran,
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
      nama: null,
      page: 1,
    };
  }

  if (queryParams.nama) {
    params = {
      ...params,
      kode: null,
      nama: queryParams.nama,
      page: 1,
    };
  }

  const fetchAllMataPelajaran = async () => {
    try {
      const { data } = await axios.get("/seleksi/mata-pelajarans", { params });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-mata-pelajaran",
      params.page,
      params.per_page,
      params.kode,
      params.nama,
    ],
    queryFn: fetchAllMataPelajaran,
    enabled: !!session.token,
  });

  return { ...query };
};
