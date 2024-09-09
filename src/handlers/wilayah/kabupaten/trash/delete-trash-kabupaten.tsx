"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashKabupaten = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (kabupatenId: string) => {
    try {
      const { data } = await axios.delete(
        `/wilayah/kabupatens/trashs/${kabupatenId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-kabupaten"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-kabupaten"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kabupaten"],
      });

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (kabupatenId: string) => onDelete(kabupatenId),
  });

  return { ...mutate };
};
