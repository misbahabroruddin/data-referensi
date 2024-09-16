"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreRincianBiaya = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (rincianBiayaId: string) => {
    try {
      const { data } = await axios.put(
        `/sippm/rincian-biayas/trashs/${rincianBiayaId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-rincian-biaya"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-rincian-biaya"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-rincian-biaya"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (rincianBiayaId: string) => onRestore(rincianBiayaId),
  });

  return { ...mutate };
};
