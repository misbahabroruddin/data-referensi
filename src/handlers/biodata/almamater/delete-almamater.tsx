"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteAlmamater = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (ukuranJasAlmamater: string) => {
    try {
      const { data } = await axios.delete(
        `/biodata/ukuran-jas-almamaters/${ukuranJasAlmamater}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-ukuran-jas-almamater"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-ukuran-jas-almamater"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-ukuran-jas-almamater"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (ukuranJasAlmamater: string) => onDelete(ukuranJasAlmamater),
  });

  return { ...mutate };
};
