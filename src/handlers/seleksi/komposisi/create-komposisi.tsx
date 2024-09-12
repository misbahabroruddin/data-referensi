"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateKomposisi = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitKomposisi = async (form: FormKomposisi) => {
    let reqBody: FormKomposisi = {
      komposisi: form.komposisi,
      kode: form.kode,
    };

    if (form.keterangan) {
      reqBody = {
        ...reqBody,
        keterangan: form.keterangan,
      };
    }

    try {
      const { data } = await axios.post(`/seleksi/komposisis`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-komposisi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-komposisi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-komposisi"],
      });

      toast.success("Komposisi berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.komposisi) {
        throw new Error(
          error.response.data.message.komposisi[0] || "Komposisi harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] || "Kode komposisi harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan komposisi harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitKomposisi,
  });

  return { ...mutate };
};
