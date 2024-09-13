"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdatePengumuman = (pengumumanId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitPengumuman = async (form: FormPengumuman) => {
    let reqBody: FormPengumuman = {
      judul: form.judul,
      jenis_pendaftaran: form.jenis_pendaftaran,
      tampil_beranda: form.tampil_beranda ? "1" : "0",
      tampil_pendaftaran: form.tampil_pendaftaran ? "1" : "0",
    };

    if (form.keterangan) {
      reqBody = {
        ...reqBody,
        keterangan: form.keterangan,
      };
    }

    try {
      const { data } = await axios.put(
        `/berita/pengumumans/${pengumumanId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-pengumuman"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-pengumuman"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-pengumuman"],
      });

      toast.success("Pengumuman berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.judul) {
        throw new Error(
          error.response.data.message.judul[0] || "Judul harus diisi",
        );
      } else if (error.response.data.message.jenis_pendaftaran) {
        throw new Error(
          error.response.data.message.jenis_pendaftaran[0] ||
            "Jenis pendaftaran harus diisi",
        );
      } else if (error.response.data.message.tampil_beranda) {
        throw new Error(
          error.response.data.message.tampil_beranda[0] ||
            "Tampil beranda harus diisi",
        );
      } else if (error.response.data.message.tampil_pendaftaran) {
        throw new Error(
          error.response.data.message.tampil_pendaftaran[0] ||
            "Tampil pendaftaran harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitPengumuman,
  });

  return { ...mutate };
};
