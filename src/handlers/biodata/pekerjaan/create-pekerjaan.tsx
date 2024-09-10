"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreatePekerjaan = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitPekerjaan = async (form: FormPekerjaan) => {
    const reqBody: FormPekerjaan = {
      kategori: form.kategori,
      deskripsi: form.deskripsi,
      kode: form.kode,
    };

    try {
      const { data } = await axios.post(`/biodata/pekerjaans`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-pekerjaan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-pekerjaan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-pekerjaan"],
      });

      toast.success("Pekerjaan berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.kategori) {
        throw new Error(
          error.response.data.message.kategori[0] ||
            "Kategori pekerjaan harus diisi",
        );
      } else if (error.response.data.message.deskripsi) {
        throw new Error(
          error.response.data.message.deskripsi[0] ||
            "Deskripsi pekerjaan harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] || "Kode pekerjaan harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitPekerjaan,
  });

  return { ...mutate };
};
