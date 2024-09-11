"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteJalurPendaftaran = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (jalurPendaftaranId: string) => {
    try {
      const { data } = await axios.delete(
        `/pendaftaran/jalur-pendaftarans/${jalurPendaftaranId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jalur-pendaftaran"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jalur-pendaftaran"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jalur-pendaftaran"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jalurPendaftaranId: string) => onDelete(jalurPendaftaranId),
  });

  return { ...mutate };
};
