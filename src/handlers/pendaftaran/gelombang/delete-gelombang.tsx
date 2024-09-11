"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteGelombang = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (gelombangId: string) => {
    try {
      const { data } = await axios.delete(
        `/pendaftaran/gelombangs/${gelombangId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-gelombang"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-gelombang"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-gelombang"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (gelombangId: string) => onDelete(gelombangId),
  });

  return { ...mutate };
};
