"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTransportasi = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (transportasiId: string) => {
    try {
      const { data } = await axios.delete(
        `/mahasiswa/transportasis/${transportasiId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-transportasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-transportasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-transportasi"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (transportasiId: string) => onDelete(transportasiId),
  });

  return { ...mutate };
};
