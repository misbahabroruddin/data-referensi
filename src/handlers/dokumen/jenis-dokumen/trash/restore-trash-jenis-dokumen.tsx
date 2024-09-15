"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreJenisDokumen = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (jenisDokumenId: string) => {
    try {
      const { data } = await axios.put(
        `/dokumen/jenis-dokumens/trashs/${jenisDokumenId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-jenis-dokumen"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-jenis-dokumen"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-dokumen"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenisDokumenId: string) => onRestore(jenisDokumenId),
  });

  return { ...mutate };
};
