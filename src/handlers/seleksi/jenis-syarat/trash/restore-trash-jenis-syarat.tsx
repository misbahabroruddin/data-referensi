"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreJenisSyarat = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (jenisSyaratId: string) => {
    try {
      const { data } = await axios.put(
        `/seleksi/jenis-syarats/trashs/${jenisSyaratId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-jenis-syarat"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-jenis-syarat"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-syarat"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenisSyaratId: string) => onRestore(jenisSyaratId),
  });

  return { ...mutate };
};
