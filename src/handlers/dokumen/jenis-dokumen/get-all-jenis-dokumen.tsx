"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllJenisDokumen = (queryParams: QueryParamsJenisDokumen) => {
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

  const fetchAllJenisDokumen = async () => {
    try {
      const { data } = await axios.get("/dokumen/jenis-dokumens", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-jenis-dokumen",
      params.page,
      params.per_page,
      params.nama,
    ],
    queryFn: fetchAllJenisDokumen,
    enabled: !!session.token,
  });

  return { ...query };
};
