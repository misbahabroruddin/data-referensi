"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllTrashJalurPendaftaran = (
  queryParams: QueryParamsJalurPendaftaran,
) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  let params: any = {
    page: queryParams.pageIndex + 1,
    per_page: queryParams.pageSize,
  };

  if (queryParams.jalur_pendaftaran) {
    params = {
      ...params,
      jalur_pendaftaran: queryParams.jalur_pendaftaran,
      page: 1,
    };
  }

  const fetchAllJalurPendaftaran = async () => {
    try {
      const { data } = await axios.get(
        "/pendaftaran/jalur-pendaftarans/trashs",
        {
          params,
        },
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-trash-jalur-pendaftaran",
      params.page,
      params.per_page,
      params.kode,
      params.jalur_pendaftaran,
    ],
    queryFn: fetchAllJalurPendaftaran,
    enabled: !!session.token,
  });

  return { ...query };
};
