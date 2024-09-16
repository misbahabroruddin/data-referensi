"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreJenjangPendidikan = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (jenjangPendidikanId: string) => {
    try {
      const { data } = await axios.put(
        `/pendidikan/jenjang-pendidikans/trashs/${jenjangPendidikanId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-jenjang-pendidikan"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-jenjang-pendidikan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenjang-pendidikan"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (jenjangPendidikanId: string) => onRestore(jenjangPendidikanId),
  });

  return { ...mutate };
};
