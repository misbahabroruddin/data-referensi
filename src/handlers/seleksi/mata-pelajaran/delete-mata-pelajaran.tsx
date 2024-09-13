"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteMataPelajaran = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (mataPelajaranId: string) => {
    try {
      const { data } = await axios.delete(
        `/seleksi/mata-pelajarans/${mataPelajaranId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-mata-pelajaran"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-mata-pelajaran"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-mata-pelajaran"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (mataPelajaranId: string) => onDelete(mataPelajaranId),
  });

  return { ...mutate };
};
