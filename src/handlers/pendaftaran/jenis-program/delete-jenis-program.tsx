"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteJenisProgram = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (jenisProgramId: string) => {
    try {
      const { data } = await axios.delete(
        `/pendaftaran/jenis-programs/${jenisProgramId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenis-program"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenis-program"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-program"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenisProgramId: string) => onDelete(jenisProgramId),
  });

  return { ...mutate };
};
