"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreJalurPendaftaran = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (jalurPendaftaranId: string) => {
    try {
      const { data } = await axios.put(
        `/pendaftaran/jalur-pendaftarans/trashs/${jalurPendaftaranId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-jalur-pendaftaran"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-jalur-pendaftaran"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jalur-pendaftaran"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jalurPendaftaranId: string) => onRestore(jalurPendaftaranId),
  });

  return { ...mutate };
};
