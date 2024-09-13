"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreMataPelajaran = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (mataPelajaranId: string) => {
    try {
      const { data } = await axios.put(
        `/seleksi/mata-pelajarans/trashs/${mataPelajaranId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-mata-pelajaran"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-mata-pelajaran"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-mata-pelajaran"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (mataPelajaranId: string) => onRestore(mataPelajaranId),
  });

  return { ...mutate };
};
