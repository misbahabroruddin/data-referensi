"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateKabupaten = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitKabupaten = async (form: FormKabupaten) => {
    let reqBody: FormKabupaten = {
      provinsi_id: form.provinsi_id.value,
      nama: form.nama,
    };

    if (form.kode) {
      reqBody = {
        ...reqBody,
        kode: form.kode,
      };
    }

    try {
      const { data } = await axios.post(`/wilayah/kabupatens`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-kabupaten"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-kabupaten"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kabupaten"],
      });

      toast.success("Kabupaten berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] || "Kode harus diisi",
        );
      } else if (error.response.data.message.provinsi_id) {
        throw new Error(
          error.response.data.message.provinsi_id[0] || "Provinsi harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitKabupaten,
  });

  return { ...mutate };
};
