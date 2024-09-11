"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreTransportasi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (transportasiId: string) => {
    try {
      const { data } = await axios.put(
        `/mahasiswa/transportasis/trashs/${transportasiId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-transportasi"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-transportasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-transportasi"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (transportasiId: string) => onRestore(transportasiId),
  });

  return { ...mutate };
};
