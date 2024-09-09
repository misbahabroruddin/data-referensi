"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashAgama = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (agamaId: string) => {
    try {
      const { data } = await axios.delete(`/biodata/agamas/trashs/${agamaId}`);

      queryClient.removeQueries({
        queryKey: ["get-all-agama"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-agama"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-agama"],
      });

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (agamaId: string) => onDelete(agamaId),
  });

  return { ...mutate };
};
