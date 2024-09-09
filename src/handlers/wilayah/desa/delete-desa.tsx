"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteDesa = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (desaId: string) => {
    try {
      const { data } = await axios.delete(`/wilayah/desas/${desaId}`);

      queryClient.invalidateQueries({
        queryKey: ["get-all-desa"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-desa"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-desa"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (desaId: string) => onDelete(desaId),
  });

  return { ...mutate };
};
