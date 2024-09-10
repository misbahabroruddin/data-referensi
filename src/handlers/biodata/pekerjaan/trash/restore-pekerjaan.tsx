"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestorePekerjaan = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (pekerjaanId: string) => {
    try {
      const { data } = await axios.put(
        `/biodata/pekerjaans/trashs/${pekerjaanId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-pekerjaan"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-pekerjaan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-pekerjaan"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (pekerjaanId: string) => onRestore(pekerjaanId),
  });

  return { ...mutate };
};
