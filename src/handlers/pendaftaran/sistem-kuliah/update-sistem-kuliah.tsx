"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateSistemKuliah = (sistemKuliahId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitSistemKuliah = async (form: FormSistemKuliah) => {
    let reqBody: FormSistemKuliah = {
      sistem_kuliah: form.sistem_kuliah,
      kode: form.kode,
    };

    if (form.keterangan) {
      reqBody = {
        ...reqBody,
        keterangan: form.keterangan,
      };
    }

    try {
      const { data } = await axios.put(
        `/pendaftaran/sistem-kuliahs/${sistemKuliahId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-sistem-kuliah"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-sistem-kuliah"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-sistem-kuliah"],
      });

      toast.success("Sistem kuliah berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.sistem_kuliah) {
        throw new Error(
          error.response.data.message.sistem_kuliah[0] ||
            "Sistem kuliah harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode sistem kuliah harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan sistem kuliah harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitSistemKuliah,
  });

  return { ...mutate };
};
