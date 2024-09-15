"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateJenisDokumen = (jenisDokumenId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitJenisDokumen = async (form: FormJenisDokumen) => {
    const reqBody: FormJenisDokumen = {
      nama: form.nama,
      mimes: "pdf",
      size: form.size,
    };

    try {
      const { data } = await axios.put(
        `/dokumen/jenis-dokumens/${jenisDokumenId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenis-dokumen"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenis-dokumen"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-dokumen"],
      });

      toast.success("Jenis dokumen berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama dokumen harus diisi",
        );
      } else if (error.response.data.message.size) {
        throw new Error(
          error.response.data.message.size[0] || "Size dokumen harus diisi",
        );
      } else if (error.response.data.message.mimes) {
        throw new Error(
          error.response.data.message.mimes[0] ||
            "Mime/tipe dokumen harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitJenisDokumen,
  });

  return { ...mutate };
};
