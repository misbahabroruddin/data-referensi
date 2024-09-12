"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateSyarat = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitSyarat = async (form: FormSyarat) => {
    const reqBody: FormSyarat = {
      nama: form.nama,
      kode: form.kode,
      point: form.point,
    };

    try {
      const { data } = await axios.post(`/seleksi/syarats`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-syarat"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-syarat"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-syarat"],
      });

      toast.success("Syarat berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Syarat harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] || "Kode syarat harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan syarat harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitSyarat,
  });

  return { ...mutate };
};
