"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteJabatanFungsional = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (jabatanFungsionalId: string) => {
    try {
      const { data } = await axios.delete(
        `/jabatan/jabatan-fungsionals/${jabatanFungsionalId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jabatan-fungsional"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jabatan-fungsional"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jabatan-fungsional"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jabatanFungsionalId: string) => onDelete(jabatanFungsionalId),
  });

  return { ...mutate };
};
