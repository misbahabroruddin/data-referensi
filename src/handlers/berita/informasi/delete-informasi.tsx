"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteInformasi = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (informasiId: string) => {
    try {
      const { data } = await axios.delete(`/berita/informasis/${informasiId}`);

      queryClient.invalidateQueries({
        queryKey: ["get-all-informasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-informasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-informasi"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

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
