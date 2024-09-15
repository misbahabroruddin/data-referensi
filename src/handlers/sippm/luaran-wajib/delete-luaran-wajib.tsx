"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteLuaranWajib = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (luaranWajibId: string) => {
    try {
      const { data } = await axios.delete(
        `/sippm/luaran-wajibs/${luaranWajibId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-luaran-wajib"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-luaran-wajib"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-luaran-wajib"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (luaranWajibId: string) => onDelete(luaranWajibId),
  });

  return { ...mutate };
};
