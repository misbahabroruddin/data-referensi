"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteProgram = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (programId: number) => {
    try {
      const { data } = await axios.delete(`/marketing/programs/${programId}`);

      queryClient.invalidateQueries({
        queryKey: ["get-all-program"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-program"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-program"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (programId: number) => onDelete(programId),
  });

  return { ...mutate };
};
