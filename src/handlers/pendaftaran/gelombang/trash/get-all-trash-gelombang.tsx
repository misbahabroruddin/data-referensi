"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllTrashGelombang = (queryParams: QueryParamsGelombang) => {
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

  if (queryParams.gelombang) {
    params = {
      ...params,
      kode: null,
      gelombang: queryParams.gelombang,
      page: 1,
    };
  }

  const fetchAllGelombang = async () => {
    try {
      const { data } = await axios.get("/pendaftaran/gelombangs/trashs", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-trash-gelombang",
      params.page,
      params.per_page,
      params.kode,
      params.gelombang,
    ],
    queryFn: fetchAllGelombang,
    enabled: !!session.token,
  });

  return { ...query };
};
