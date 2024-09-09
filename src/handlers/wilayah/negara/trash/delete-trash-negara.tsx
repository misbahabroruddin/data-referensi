"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashNegara = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (id: string) => {
    try {
      const { data } = await axios.delete(`/wilayah/negaras/trashs/${id}`);

      toast.success("Data berhasil dihapus");

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
    mutationFn: (id: string) => onDelete(id),
  });

  return { ...mutate };
};
