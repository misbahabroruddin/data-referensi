"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteRincianBiaya = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (rincianBiayaId: string) => {
    try {
      const { data } = await axios.delete(
        `/sippm/rincian-biayas/${rincianBiayaId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-rincian-biaya"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-rincian-biaya"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-rincian-biaya"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (rincianBiayaId: string) => onDelete(rincianBiayaId),
  });

  return { ...mutate };
};
