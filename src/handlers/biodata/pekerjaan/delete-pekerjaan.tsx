"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeletePekerjaan = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (pekerjaanId: string) => {
    try {
      const { data } = await axios.delete(`/biodata/pekerjaans/${pekerjaanId}`);

      queryClient.invalidateQueries({
        queryKey: ["get-all-pekerjaan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-pekerjaan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-pekerjaan"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (pekerjaanId: string) => onDelete(pekerjaanId),
  });

  return { ...mutate };
};