"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashSumberInformasi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (sumberInformasiId: number) => {
    try {
      const { data } = await axios.delete(
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

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (sumberInformasiId: number) => onDelete(sumberInformasiId),
  });

  return { ...mutate };
};
