"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreJenisPenelitian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (jenisPenelitianId: string) => {
    try {
      const { data } = await axios.put(
        `/sippm/jenis-penelitians/trashs/${jenisPenelitianId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-jenis-penelitian"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-jenis-penelitian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-penelitian"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenisPenelitianId: string) => onRestore(jenisPenelitianId),
  });

  return { ...mutate };
};
