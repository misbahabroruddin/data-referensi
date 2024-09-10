"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreJenisTinggal = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (jenisTinggalId: string) => {
    try {
      const { data } = await axios.put(
        `/mahasiswa/jenis-tinggals/trashs/${jenisTinggalId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-jenis-tinggal"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-jenis-tinggal"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-tinggal"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenisTinggalId: string) => onRestore(jenisTinggalId),
  });

  return { ...mutate };
};
