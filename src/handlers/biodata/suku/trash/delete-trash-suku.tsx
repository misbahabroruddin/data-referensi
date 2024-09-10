"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashSuku = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (sukuId: string) => {
    try {
      const { data } = await axios.delete(`/biodata/sukus/trashs/${sukuId}`);

      queryClient.removeQueries({
        queryKey: ["get-all-suku"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-suku"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-suku"],
      });

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (sukuId: string) => onDelete(sukuId),
  });

  return { ...mutate };
};
