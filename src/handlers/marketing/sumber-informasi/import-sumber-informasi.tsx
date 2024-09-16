"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useImportSumberInformasi = () => {
  const axios = useAxios();
  const { errorHandler } = useErrorHandling();
  const queryClient = useQueryClient();

  const importFile = async (form: any) => {
    const formData = new FormData();
    formData.append("file_import", form);

    try {
      const { data } = await axios.post(
        "/marketing/sumber-informasis/import",
        formData,
      );

      toast.success("Import berhasil");

      queryClient.invalidateQueries({
        queryKey: ["get-all-sumber-informasi"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-sumber-informasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-sumber-informasi"],
      });

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
