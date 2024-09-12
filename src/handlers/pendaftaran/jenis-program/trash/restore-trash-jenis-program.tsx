"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreJenisProgram = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (jenisProgramId: string) => {
    try {
      const { data } = await axios.put(
        `/pendaftaran/jenis-programs/trashs/${jenisProgramId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-jenis-program"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-jenis-program"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-program"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenisProgramId: string) => onRestore(jenisProgramId),
  });

  return { ...mutate };
};
