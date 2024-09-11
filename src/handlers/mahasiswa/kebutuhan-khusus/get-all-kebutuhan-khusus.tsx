"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllKebutuhanKhusus = (
  queryParams: QueryParamsKebutuhanKhusus,
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

  if (queryParams.kebutuhan_khusus) {
    params = {
      ...params,
      kode: null,
      kebutuhan_khusus: queryParams.kebutuhan_khusus,
      page: 1,
    };
  }

  const fetchAllKebutuhanKhusus = async () => {
    try {
      const { data } = await axios.get("/mahasiswa/kebutuhan-khususes", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-kebutuhan-khusus",
      params.page,
      params.per_page,
      params.kode,
      params.kebutuhan_khusus,
    ],
    queryFn: fetchAllKebutuhanKhusus,
    enabled: !!session.token,
  });

  return { ...query };
};
