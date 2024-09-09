"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteKecamatan = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (kecamatanId: string) => {
    try {
      const { data } = await axios.delete(`/wilayah/kecamatans/${kecamatanId}`);

      queryClient.invalidateQueries({
        queryKey: ["get-all-kecamatan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-kecamatan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kecamatan"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (kecamatanId: string) => onDelete(kecamatanId),
  });

  return { ...mutate };
};
