"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateJenisPenelitian = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitJenisPenelitian = async (form: FormJenisPenelitian) => {
    let reqBody: FormJenisPenelitian = {
      nama: form.nama,
    };

    if (form.keterangan) {
      reqBody = {
        ...reqBody,
        keterangan: form.keterangan,
      };
    }

    try {
      const { data } = await axios.post(`/sippm/jenis-penelitians`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenis-penelitian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenis-penelitian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-penelitian"],
      });

      toast.success("Jenis penelitian berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama penelitian harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan penelitian harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitJenisPenelitian,
  });

  return { ...mutate };
};
