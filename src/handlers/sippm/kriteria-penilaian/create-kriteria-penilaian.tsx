"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateKriteriaPenilaian = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitKriteriaPenilaian = async (form: FormKriteriaPenilaian) => {
    const reqBody: FormKriteriaPenilaian = {
      nama: form.nama,
      bobot: form.bobot,
    };

    try {
      const { data } = await axios.post(`/sippm/kriteria-penilaians`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-kriteria-penilaian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-kriteria-penilaian"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kriteria-penilaian"],
      });

      toast.success("Kriteria penilaian berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama harus diisi",
        );
      } else if (error.response.data.message.bobot) {
        throw new Error(
          error.response.data.message.bobot[0] || "Bobot harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitKriteriaPenilaian,
  });

  return { ...mutate };
};
