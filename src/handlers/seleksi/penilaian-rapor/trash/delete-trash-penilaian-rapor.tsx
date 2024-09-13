"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashPenilaianRapor = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (penialainRaporId: string) => {
    try {
      const { data } = await axios.delete(
        `/seleksi/penilaian-rapors/trashs/${penialainRaporId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-penilaian-rapor"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-penilaian-rapor"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-penilaian-rapor"],
      });

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (penialainRaporId: string) => onDelete(penialainRaporId),
  });

  return { ...mutate };
};
