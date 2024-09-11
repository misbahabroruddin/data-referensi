"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllTransportasi = (queryParams: QueryParamsTransportasi) => {
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

  if (queryParams.transportasi) {
    params = {
      ...params,
      kode: null,
      transportasi: queryParams.transportasi,
      page: 1,
    };
  }

  const fetchAllTransportasi = async () => {
    try {
      const { data } = await axios.get("/mahasiswa/transportasis", { params });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-transportasi",
      params.page,
      params.per_page,
      params.kode,
      params.transportasi,
    ],
    queryFn: fetchAllTransportasi,
    enabled: !!session.token,
  });

  return { ...query };
};
