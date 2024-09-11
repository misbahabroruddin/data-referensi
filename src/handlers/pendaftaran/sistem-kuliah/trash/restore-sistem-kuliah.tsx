"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreSistemKuliah = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (sistemKuliahId: string) => {
    try {
      const { data } = await axios.put(
        `/pendaftaran/sistem-kuliahs/trashs/${sistemKuliahId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-sistem-kuliah"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-sistem-kuliah"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-sistem-kuliah"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (sistemKuliahId: string) => onRestore(sistemKuliahId),
  });

  return { ...mutate };
};
