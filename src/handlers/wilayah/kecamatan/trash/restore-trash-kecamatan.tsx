"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreKecamatan = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (kecamatanId: string) => {
    try {
      const { data } = await axios.put(
        `/wilayah/kecamatans/trashs/${kecamatanId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-kecamatan"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-kecamatan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kecamatan"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (kecamatanId: string) => onRestore(kecamatanId),
  });

  return { ...mutate };
};
