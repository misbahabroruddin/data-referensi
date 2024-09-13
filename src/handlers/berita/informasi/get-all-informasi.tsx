"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllInformasi = (queryParams: QueryParamsInformasi) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  let params: any = {
    page: queryParams.pageIndex + 1,
    per_page: queryParams.pageSize,
  };

  if (queryParams.judul) {
    params = {
      ...params,
      judul: queryParams.judul,
      page: 1,
    };
  }

  const fetchAllInformasi = async () => {
    try {
      const { data } = await axios.get("/berita/informasis", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-all-informasi", params.page, params.per_page, params.judul],
    queryFn: fetchAllInformasi,
    enabled: !!session.token,
  });

  return { ...query };
};
