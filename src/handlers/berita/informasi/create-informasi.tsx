"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateInformasi = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitInformasi = async (form: FormInformasi) => {
    const reqBody: FormInformasi = {
      judul: form.judul,
      url: form.url,
      status: form.status ? "1" : "0",
      urutan: form.urutan,
    };

    try {
      const { data } = await axios.post(`/seleksi/beritas`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-berita"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-berita"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-berita"],
      });

      toast.success("Informasi berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.judul) {
        throw new Error(
          error.response.data.message.judul[0] || "Judul harus diisi",
        );
      } else if (error.response.data.message.url) {
        throw new Error(
          error.response.data.message.url[0] || "URL harus diisi",
        );
      } else if (error.response.data.message.urutan) {
        throw new Error(
          error.response.data.message.urutan[0] || "Urutan harus diisi",
        );
      } else if (error.response.data.message.status) {
        throw new Error(
          error.response.data.message.status[0] || "Status harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitInformasi,
  });

  return { ...mutate };
};
