"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashProvinsi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (provinsiId: string) => {
    try {
      const { data } = await axios.delete(
        `/wilayah/provinsis/trashs/${provinsiId}`,
      );

      toast.success("Data berhasil dihapus");

      queryClient.removeQueries({
        queryKey: ["get-all-provinsi"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-provinsi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-provinsi"],
      });

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (provinsiId: string) => onDelete(provinsiId),
  });

  return { ...mutate };
};
