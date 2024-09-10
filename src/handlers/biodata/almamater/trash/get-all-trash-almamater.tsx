"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useSession } from "@/lib/hooks/use-session";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetAllTrashAlmamater = (queryParams: QueryParamsAlmamater) => {
  const axios = useAxios();

  const { session } = useSession();

  const { errorHandler } = useErrorHandling();

  let params: any = {
    page: queryParams.pageIndex + 1,
    per_page: queryParams.pageSize,
  };

  if (queryParams.ukuran) {
    params = {
      ...params,
      ukuran: queryParams.ukuran,
      page: 1,
    };
  }

  const fetchAllAlmamater = async () => {
    try {
      const { data } = await axios.get(
        "/biodata/ukuran-jas-almamaters/trashs",
        { params },
      );

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-trash-ukuran-jas-almamater",
      params.page,
      params.per_page,
      params.ukuran,
    ],
    queryFn: fetchAllAlmamater,
    enabled: !!session.token,
  });

  return { ...query };
};
