"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreAlmamater = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (ukuranJasAlmamaterId: string) => {
    try {
      const { data } = await axios.put(
        `/biodata/ukuran-jas-almamaters/trashs/${ukuranJasAlmamaterId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-ukuran-jas-almamater"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-ukuran-jas-almamater"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-ukuran-jas-almamater"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (ukuranJasAlmamaterId: string) =>
      onRestore(ukuranJasAlmamaterId),
  });

  return { ...mutate };
};
