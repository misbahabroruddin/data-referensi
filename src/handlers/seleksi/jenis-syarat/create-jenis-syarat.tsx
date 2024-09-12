"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateJenisSyarat = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitJenisSyarat = async (form: FormJenisSyarat) => {
    let reqBody: FormJenisSyarat = {
      jenis_syarat: form.jenis_syarat,
      kode: form.kode,
    };

    if (form.keterangan) {
      reqBody = {
        ...reqBody,
        keterangan: form.keterangan,
      };
    }

    try {
      const { data } = await axios.post(`/seleksi/jenis-syarats`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenis-syarat"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenis-syarat"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-syarat"],
      });

      toast.success("Jenis syarat berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.jenis_syarat) {
        throw new Error(
          error.response.data.message.jenis_syarat[0] ||
            "Jenis syarat harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode jenis syarat harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan jenis syarat harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitJenisSyarat,
  });

  return { ...mutate };
};
