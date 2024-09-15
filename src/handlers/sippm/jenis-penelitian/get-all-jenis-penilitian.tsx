"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllJenisPenelitian = (
  queryParams: QueryParamsJenisPenelitian,
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
      page: 1,
    };
  }

  const fetchAllJenisPenelitian = async () => {
    try {
      const { data } = await axios.get("/sippm/jenis-penelitians", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-jenis-penelitian",
      params.page,
      params.per_page,
      params.nama,
    ],
    queryFn: fetchAllJenisPenelitian,
    enabled: !!session.token,
  });

  return { ...query };
};
