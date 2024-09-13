"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeletePenilaianRapor = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (penilaianRaporId: string) => {
    try {
      const { data } = await axios.delete(
        `/seleksi/penilaian-rapors/${penilaianRaporId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-penilaian-rapor"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-penilaian-rapor"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-penilaian-rapor"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (penilaianRaporId: string) => onDelete(penilaianRaporId),
  });

  return { ...mutate };
};
