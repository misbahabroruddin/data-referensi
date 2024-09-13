"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestorePenilaianRapor = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (penilaianRaporId: string) => {
    try {
      const { data } = await axios.put(
        `/seleksi/penilaian-rapors/trashs/${penilaianRaporId}`,
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

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (penilaianRaporId: string) => onRestore(penilaianRaporId),
  });

  return { ...mutate };
};
