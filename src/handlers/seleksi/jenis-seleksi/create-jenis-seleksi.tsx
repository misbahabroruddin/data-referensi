"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateJenisSeleksi = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitJenisSeleksi = async (form: FormJenisSeleksi) => {
    const reqBody: FormJenisSeleksi = {
      nama: form.nama,
      kelulusan: form.kelulusan,
      kode: form.kode,
      bebas_tes: form.bebas_tes ? "1" : "0",
      cbt: form.cbt ? "1" : "0",
      pakai_ruangan: form.pakai_ruangan ? "1" : "0",
      upload_berkas: form.upload_berkas ? "1" : "0",
      wajib_ikut: form.wajib_ikut ? "1" : "0",
    };

    try {
      const { data } = await axios.post(`/seleksi/jenis-seleksis`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenis-seleksi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenis-seleksi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-seleksi"],
      });

      toast.success("Jenis seleksi berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode jenis seleksi harus diisi",
        );
      } else if (error.response.data.message.kelulusan) {
        throw new Error(
          error.response.data.message.kelulusan[0] || "Kelulusan harus diisi",
        );
      } else if (error.response.data.message.bebas_tes) {
        throw new Error(
          error.response.data.message.bebas_tes[0] || "Bebas tes harus diisi",
        );
      } else if (error.response.data.message.wajib_ikut) {
        throw new Error(
          error.response.data.message.wajib_ikut[0] || "Wajib ikut harus diisi",
        );
      } else if (error.response.data.message.pakai_ruangan) {
        throw new Error(
          error.response.data.message.pakai_ruangan[0] ||
            "Pakai ruangan harus diisi",
        );
      } else if (error.response.data.message.cbt) {
        throw new Error(
          error.response.data.message.cbt[0] || "CBT harus diisi",
        );
      } else if (error.response.data.message.upload_berkas) {
        throw new Error(
          error.response.data.message.upload_berkas[0] ||
            "Upload berkas harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitJenisSeleksi,
  });

  return { ...mutate };
};
