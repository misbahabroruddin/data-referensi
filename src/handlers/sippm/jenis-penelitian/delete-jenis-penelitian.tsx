"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteJenisPenelitian = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (jenisPenelitianId: string) => {
    try {
      const { data } = await axios.delete(
        `/sippm/jenis-penelitians/${jenisPenelitianId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenis-penelitian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenis-penelitian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-penelitian"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenisPenelitianId: string) => onDelete(jenisPenelitianId),
  });

  return { ...mutate };
};
