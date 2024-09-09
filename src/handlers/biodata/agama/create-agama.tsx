"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateAgama = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitAgama = async (form: FormAgama) => {
    const reqBody: FormAgama = {
      nama: form.nama,
      kode: form.kode,
    };

    try {
      const { data } = await axios.post(`/biodata/agamas`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-agama"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-agama"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-agama"],
      });

      toast.success("Agama berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama agama harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] || "Kode agama harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitAgama,
  });

  return { ...mutate };
};
