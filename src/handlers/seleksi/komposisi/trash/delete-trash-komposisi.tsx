"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashKomposisi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (seleksiId: string) => {
    try {
      const { data } = await axios.delete(
        `/seleksi/komposisis/trashs/${seleksiId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-komposisi"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-komposisi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-komposisi"],
      });

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (seleksiId: string) => onDelete(seleksiId),
  });

  return { ...mutate };
};
