"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useImportJenisSeleksi = () => {
  const axios = useAxios();
  const { errorHandler } = useErrorHandling();
  const queryClient = useQueryClient();

  const importFile = async (form: any) => {
    const formData = new FormData();
    formData.append("file_import", form);

    try {
      const { data } = await axios.post(
        "/seleksi/jenis-seleksis/import",
        formData,
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenis-seleksi"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-trash-jenis-seleksi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-seleksi"],
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