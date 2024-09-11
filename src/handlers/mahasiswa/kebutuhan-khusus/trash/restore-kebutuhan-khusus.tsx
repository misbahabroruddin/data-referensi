"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreKebutuhanKhusus = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (kebutuhanKhususId: string) => {
    try {
      const { data } = await axios.put(
        `/mahasiswa/kebutuhan-khususes/trashs/${kebutuhanKhususId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-kebutuhan-khusus"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-kebutuhan-khusus"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kebutuhan-khusus"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (kebutuhanKhususId: string) => onRestore(kebutuhanKhususId),
  });

  return { ...mutate };
};
