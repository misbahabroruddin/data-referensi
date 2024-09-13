"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashInformasi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (informasiId: string) => {
    try {
      const { data } = await axios.delete(
        `/berita/informasis/trashs/${informasiId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-informasi"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-informasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-informasi"],
      });

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (informasiId: string) => onDelete(informasiId),
  });

  return { ...mutate };
};
