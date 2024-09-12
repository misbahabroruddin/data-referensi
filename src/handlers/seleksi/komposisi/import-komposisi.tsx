"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useImportKomposisi = () => {
  const axios = useAxios();
  const { errorHandler } = useErrorHandling();
  const queryClient = useQueryClient();

  const importFile = async (form: any) => {
    const formData = new FormData();
    formData.append("file_import", form);

    try {
      const { data } = await axios.post("/seleksi/komposisis/import", formData);

      queryClient.invalidateQueries({
        queryKey: ["get-all-komposisi"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-komposisi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-komposisi"],
      });

      toast.success("Import berhasil");

      return data;
    } catch (error: any) {
      if (error.response.data.message.file_import) {
        throw new Error(error.response.data.message.file_import);
      }
      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: importFile,
  });

  return { ...mutate };
};
