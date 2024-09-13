"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreatePenilaianRapor = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitPenilaianRapor = async (form: FormPenilaianRapor) => {
    let reqBody: FormPenilaianRapor = {
      nama_penilaian: form.nama_penilaian,
      kode: form.kode,
      nilai: form.nilai,
      mata_pelajaran_id: form.mata_pelajaran_id.value,
    };

    if (form.keterangan) {
      reqBody = {
        ...reqBody,
        keterangan: form.keterangan,
      };
    }

    try {
      const { data } = await axios.post(`/seleksi/penilaian-rapors`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-penilaian-rapor"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-penilaian-rapor"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-penilaian-rapor"],
      });

      toast.success("Penilaian rapor berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama_penilaian) {
        throw new Error(
          error.response.data.message.nama_penilaian[0] ||
            "Nama penilaian rapor harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode penilaian rapor harus diisi",
        );
      } else if (error.response.data.message.nilai) {
        throw new Error(
          error.response.data.message.nilai[0] || "Nilai harus diisi",
        );
      } else if (error.response.data.message.mata_pelajaran_id) {
        throw new Error(
          error.response.data.message.mata_pelajaran_id[0] ||
            "Mata pelajaran harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitPenilaianRapor,
  });

  return { ...mutate };
};
