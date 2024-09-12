"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreSyarat = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (syaratId: string) => {
    try {
      const { data } = await axios.put(`/seleksi/syarats/trashs/${syaratId}`);

      queryClient.removeQueries({
        queryKey: ["get-all-syarat"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-syarat"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-syarat"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (syaratId: string) => onRestore(syaratId),
  });

  return { ...mutate };
};
