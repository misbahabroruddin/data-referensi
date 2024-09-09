"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteProvinsi = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (provinsiId: string) => {
    try {
      const { data } = await axios.delete(`/wilayah/provinsis/${provinsiId}`);

      toast.success("Data berhasil dipindahkan ke trash");

      queryClient.invalidateQueries({
        queryKey: ["get-all-provinsi"],
      });

      queryClient.removeQueries({
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
