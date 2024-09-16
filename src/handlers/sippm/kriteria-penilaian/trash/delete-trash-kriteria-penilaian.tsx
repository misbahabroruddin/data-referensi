"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashKriteriaPenilaian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (kriteriaPenilaianId: number) => {
    try {
      const { data } = await axios.delete(
        `/sippm/kriteria-penilaians/trashs/${kriteriaPenilaianId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-kriteria-penilaian"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-kriteria-penilaian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kriteria-penilaian"],
      });

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (kriteriaPenilaianId: number) => onDelete(kriteriaPenilaianId),
  });

  return { ...mutate };
};
