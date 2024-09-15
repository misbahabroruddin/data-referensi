"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreLuaranWajib = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (luaranWajibId: string) => {
    try {
      const { data } = await axios.put(
        `/sippm/luaran-wajibs/trashs/${luaranWajibId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-luaran-wajib"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-luaran-wajib"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-luaran-wajib"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (luaranWajibId: string) => onRestore(luaranWajibId),
  });

  return { ...mutate };
};
