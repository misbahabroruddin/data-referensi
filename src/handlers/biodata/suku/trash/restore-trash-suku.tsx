"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreSuku = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (agamaId: string) => {
    try {
      const { data } = await axios.put(`/biodata/agamas/trashs/${agamaId}`);

      queryClient.removeQueries({
        queryKey: ["get-all-agama"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-agama"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-agama"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (agamaId: string) => onRestore(agamaId),
  });

  return { ...mutate };
};
