"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashAlmamater = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (ukuranJasAlmamaterId: string) => {
    try {
      const { data } = await axios.delete(
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

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (ukuranJasAlmamaterId: string) =>
      onDelete(ukuranJasAlmamaterId),
  });

  return { ...mutate };
};
