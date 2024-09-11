"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteKebutuhanKhusus = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (kebutuhanKhususId: string) => {
    try {
      const { data } = await axios.delete(
        `/mahasiswa/kebutuhan-khususes/${kebutuhanKhususId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-kebutuhan-khusus"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-kebutuhan-khusus"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kebutuhan-khusus"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (kebutuhanKhususId: string) => onDelete(kebutuhanKhususId),
  });

  return { ...mutate };
};
