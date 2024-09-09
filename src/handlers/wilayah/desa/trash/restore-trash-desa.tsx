"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreDesa = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (desaId: string) => {
    try {
      const { data } = await axios.put(`/wilayah/desas/trashs/${desaId}`);

      queryClient.removeQueries({
        queryKey: ["get-all-desa"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-desa"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-desa"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (desaId: string) => onRestore(desaId),
  });

  return { ...mutate };
};
