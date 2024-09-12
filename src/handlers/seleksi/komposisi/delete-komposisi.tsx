"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteKomposisi = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (komposisiId: string) => {
    try {
      const { data } = await axios.delete(`/seleksi/komposisis/${komposisiId}`);

      queryClient.invalidateQueries({
        queryKey: ["get-all-komposisi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-komposisi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-komposisi"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (komposisiId: string) => onDelete(komposisiId),
  });

  return { ...mutate };
};
