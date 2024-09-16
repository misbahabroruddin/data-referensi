"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreSumberInformasi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (sumberInformasiId: number) => {
    try {
      const { data } = await axios.put(
        `/marketing/sumber-informasis/trashs/${sumberInformasiId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-sumber-informasi"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-sumber-informasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-sumber-informasi"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (sumberInformasiId: number) => onRestore(sumberInformasiId),
  });

  return { ...mutate };
};
