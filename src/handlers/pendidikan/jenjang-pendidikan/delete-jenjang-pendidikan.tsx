"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useDeleteJenjangPendidikan = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onDelete = async (jenjangPendidikanId: string) => {
    try {
      const { data } = await axios.delete(
        `/pendidikan/jenjang-pendidikans/${jenjangPendidikanId}`,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenjang-pendidikan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenjang-pendidikan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenjang-pendidikan"],
      });

      toast.success("Data berhasil dipindahkan ke trash");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenjangPendidikanId: string) => onDelete(jenjangPendidikanId),
  });

  return { ...mutate };
};
