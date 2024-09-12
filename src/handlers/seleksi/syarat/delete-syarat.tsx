"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteSyarat = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (syaratId: string) => {
    try {
      const { data } = await axios.delete(`/seleksi/syarats/${syaratId}`);

      queryClient.invalidateQueries({
        queryKey: ["get-all-syarat"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-syarat"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-syarat"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (syaratId: string) => onDelete(syaratId),
  });

  return { ...mutate };
};
