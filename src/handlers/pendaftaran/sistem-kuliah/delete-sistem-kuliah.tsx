"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteSistemKuliah = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (sistemKuliahId: string) => {
    try {
      const { data } = await axios.delete(
        `/pendaftaran/sistem-kuliahs/${sistemKuliahId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-sistem-kuliah"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-sistem-kuliah"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-sistem-kuliah"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (sistemKuliahId: string) => onDelete(sistemKuliahId),
  });

  return { ...mutate };
};
