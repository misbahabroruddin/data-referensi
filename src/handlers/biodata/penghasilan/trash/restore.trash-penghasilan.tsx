"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestorePenghasilan = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (penghasilanId: string) => {
    try {
      const { data } = await axios.put(
        `/biodata/penghasilans/trashs/${penghasilanId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-penghasilan"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-penghasilan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-penghasilan"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (penghasilanId: string) => onRestore(penghasilanId),
  });

  return { ...mutate };
};
