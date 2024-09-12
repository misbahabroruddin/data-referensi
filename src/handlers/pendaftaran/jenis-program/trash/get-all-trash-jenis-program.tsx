"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllTrashJenisProgram = (
  queryParams: QueryParamsJenisProgram,
) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  let params: any = {
    page: queryParams.pageIndex + 1,
    per_page: queryParams.pageSize,
  };

  if (queryParams.jenis_program) {
    params = {
      ...params,
      jenis_program: queryParams.jenis_program,
      page: 1,
    };
  }

  const fetchAllJenisProgram = async () => {
    try {
      const { data } = await axios.get("/pendaftaran/jenis-programs/trashs", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-trash-jenis-program",
      params.page,
      params.per_page,
      params.kode,
      params.jenis_program,
    ],
    queryFn: fetchAllJenisProgram,
    enabled: !!session.token,
  });

  return { ...query };
};
