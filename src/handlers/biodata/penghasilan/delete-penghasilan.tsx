"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeletePenghasilan = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (penghasilanId: string) => {
    try {
      const { data } = await axios.delete(
        `/biodata/penghasilans/${penghasilanId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-penghasilan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-penghasilan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-penghasilan"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (penghasilanId: string) => onDelete(penghasilanId),
  });

  return { ...mutate };
};
