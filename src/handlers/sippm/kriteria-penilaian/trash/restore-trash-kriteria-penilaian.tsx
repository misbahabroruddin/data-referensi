"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreKriteriaPenilaian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (kriteriaPenilaianId: number) => {
    try {
      const { data } = await axios.put(
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

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (kriteriaPenilaianId: number) => onRestore(kriteriaPenilaianId),
  });

  return { ...mutate };
};
