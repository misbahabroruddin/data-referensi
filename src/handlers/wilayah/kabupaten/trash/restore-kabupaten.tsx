"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreKabupaten = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (kabupatenId: string) => {
    try {
      const { data } = await axios.put(
        `/wilayah/kabupatens/trashs/${kabupatenId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-kabupaten"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-kabupaten"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kabupaten"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (kabupatenId: string) => onRestore(kabupatenId),
  });

  return { ...mutate };
};
