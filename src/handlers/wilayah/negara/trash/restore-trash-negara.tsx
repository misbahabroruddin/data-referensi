"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreNegara = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (id: string) => {
    try {
      const { data } = await axios.put(`/wilayah/negaras/trashs/${id}`);

      toast.success("Data berhasil dikembalikan");

      queryClient.invalidateQueries({
        queryKey: ["get-all-negara"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-negara"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-negara"],
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (id: string) => onRestore(id),
  });

  return { ...mutate };
};
