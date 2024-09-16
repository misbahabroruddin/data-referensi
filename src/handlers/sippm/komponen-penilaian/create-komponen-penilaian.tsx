"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateKomponenPenilaian = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitKomponenPenilaian = async (form: FormKomponenPenilaian) => {
    const reqBody: FormKomponenPenilaian = {
      nama: form.nama,
      kriteria_penilaian_id: form.kriteria_penilaian_id.value,
    };

    try {
      const { data } = await axios.post(`/sippm/komponen-penilaians`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-komponen-penilaian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-komponen-penilaian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-komponen-penilaian"],
      });

      toast.success("Komponen penilaian berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama harus diisi",
        );
      } else if (error.response.data.message.kriteria_penilaian_id) {
        throw new Error(
          error.response.data.message.kriteria_penilaian_id[0] ||
            "Kriteria penilaian harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitKomponenPenilaian,
  });

  return { ...mutate };
};
