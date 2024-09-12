"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteJenisSyarat = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (jenisSyaratId: string) => {
    try {
      const { data } = await axios.delete(
        `/seleksi/jenis-syarats/${jenisSyaratId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenis-syarat"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenis-syarat"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-syarat"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenisSyaratId: string) => onDelete(jenisSyaratId),
  });

  return { ...mutate };
};
