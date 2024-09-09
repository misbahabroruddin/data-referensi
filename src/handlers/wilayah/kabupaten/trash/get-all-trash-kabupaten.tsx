"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllTrashKabupaten = (queryParams: QueryParamsKabupaten) => {
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

  if (queryParams.provinsi_id) {
    params = {
      ...params,
      nama: null,
      kode: null,
      provinsi_id: queryParams.provinsi_id,
    };
  }

  const fetchAllKabupaten = async () => {
    try {
      const { data } = await axios.get("/wilayah/kabupatens/trashs", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-trash-kabupaten",
      params.page,
      params.per_page,
      params.provinsi_id,
      params.nama,
      params.kode,
    ],
    queryFn: fetchAllKabupaten,
    enabled: !!session.token,
  });

  return { ...query };
};
