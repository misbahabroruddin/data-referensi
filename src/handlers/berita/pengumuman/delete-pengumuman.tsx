"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeletePengumuman = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (pengumumanId: string) => {
    try {
      const { data } = await axios.delete(
        `/berita/pengumumans/${pengumumanId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-pengumuman"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-pengumuman"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-pengumuman"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (pengumumanId: string) => onDelete(pengumumanId),
  });

  return { ...mutate };
};
