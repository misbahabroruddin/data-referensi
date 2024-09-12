"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useRestoreKomposisi = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { errorHandler } = useErrorHandling();

  const onRestore = async (komposisiId: string) => {
    try {
      const { data } = await axios.put(
        `/seleksi/komposisis/trashs/${komposisiId}`,
      );

      queryClient.removeQueries({
        queryKey: ["get-all-komposisi"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-komposisi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-komposisi"],
      });

      toast.success("Data berhasil dikembalikan");

      return data;
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: (komposisiId: string) => onRestore(komposisiId),
  });

  return { ...mutate };
};
