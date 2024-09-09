"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteNegara = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (negaraId: string) => {
    try {
      const { data } = await axios.delete(`/wilayah/negaras/${negaraId}`);

      toast.success("Data berhasil dipindahkan ke trash");

      queryClient.invalidateQueries({
        queryKey: ["get-all-negara"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-negara"],
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (negaraId: string) => onDelete(negaraId),
  });

  return { ...mutate };
};
