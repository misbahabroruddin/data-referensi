"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashJenisSeleksi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (jenisSeleksiId: string) => {
    try {
      const { data } = await axios.delete(
        `/seleksi/jenis-seleksis/trashs/${jenisSeleksiId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-jenis-seleksi"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-jenis-seleksi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-seleksi"],
      });

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenisSeleksiId: string) => onDelete(jenisSeleksiId),
  });

  return { ...mutate };
};