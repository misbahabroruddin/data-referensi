"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllTrashPengumuman = (
  queryParams: QueryParamsPengumuman,
) => {
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
      jenis_pendaftaran: null,
      page: 1,
    };
  }

  if (queryParams.jenis_pendaftaran) {
    params = {
      ...params,
      jenis_pendaftaran: queryParams.jenis_pendaftaran,
      judul: null,
      page: 1,
    };
  }

  const fetchAllPengumuman = async () => {
    try {
      const { data } = await axios.get("/berita/pengumumans/trashs", {
        params,
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-trash-pengumuman",
      params.page,
      params.per_page,
      params.judul,
      params.jenis_pendaftaran,
    ],
    queryFn: fetchAllPengumuman,
    enabled: !!session.token,
  });

  return { ...query };
};
