"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllDesa = (queryParams: QueryParamsDesa) => {
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
      page: 1,
    };
  }

  if (queryParams.kode) {
    params = {
      ...params,
      nama: null,
      kode: queryParams.kode,
    };
  }

  if (queryParams.kecamatan_id) {
    params = {
      ...params,
      nama: null,
      kode: null,
      kecamatan_id: queryParams.kecamatan_id,
    };
  }

  const fetchAllDesa = async () => {
    try {
      const { data } = await axios.get("/wilayah/desas", { params });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-desa",
      params.page,
      params.per_page,
      params.kecamatan_id,
      params.nama,
      params.kode,
    ],
    queryFn: fetchAllDesa,
    enabled: !!session.token,
  });

  return { ...query };
};
