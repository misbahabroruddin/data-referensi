"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestorePengumuman = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (pengumumanId: string) => {
    try {
      const { data } = await axios.put(
        `/berita/pengumumans/trashs/${pengumumanId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-pengumuman"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-pengumuman"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-pengumuman"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (pengumumanId: string) => onRestore(pengumumanId),
  });

  return { ...mutate };
};
