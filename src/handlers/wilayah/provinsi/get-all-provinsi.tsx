"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllProvinsi = (queryParams: QueryParamsProvinsi) => {
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
    };
  }

  if (queryParams.kode) {
    params = {
      ...params,
      nama: null,
      kode: queryParams.kode,
    };
  }

  const fetchAllProvinsi = async () => {
    try {
      const { data } = await axios.get("/wilayah/provinsis", { params });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-provinsi",
      params.page,
      params.per_page,
      params.negara_id,
      params.nama,
      params.kode,
    ],
    queryFn: fetchAllProvinsi,
    enabled: !!session.token,
  });

  return { ...query };
};
