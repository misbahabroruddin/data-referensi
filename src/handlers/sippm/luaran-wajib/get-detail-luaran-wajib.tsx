"use client";

import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useGetDetailLuaranWajib = (luaranWajibId: string) => {
  const axios = useAxios();

  const { errorHandler } = useErrorHandling();

  const fetchDetailLuaranWajib = async () => {
    try {
      const { data } = await axios.get(`/sippm/luaran-wajibs/${luaranWajibId}`);

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-luaran-wajib", luaranWajibId],
    queryFn: fetchDetailLuaranWajib,
    enabled: false,
  });

  return { ...query };
};
