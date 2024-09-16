"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteTrashKomponenPenilaian = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onDelete = async (komponenPenilaianId: number) => {
    try {
      const { data } = await axios.delete(
        `/sippm/komponen-penilaians/trashs/${komponenPenilaianId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-komponen-penilaian"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-komponen-penilaian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-komponen-penilaian"],
      });

      toast.success("Data berhasil dihapus");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (komponenPenilaianId: number) => onDelete(komponenPenilaianId),
  });

  return { ...mutate };
};
