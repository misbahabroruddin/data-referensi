"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateMataPelajaran = (mataPelajaranId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitMataPelajaran = async (form: FormMataPelajaran) => {
    const reqBody: FormMataPelajaran = {
      nama: form.nama,
      kode: form.kode,
      point_minimal: form.point_minimal,
    };

    try {
      const { data } = await axios.put(
        `/seleksi/mata-pelajarans/${mataPelajaranId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-mata-pelajaran"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-mata-pelajaran"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-mata-pelajaran"],
      });

      toast.success("Mata pelajaran berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] ||
            "Nama mata pelajaran harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode mata pelajaran harus diisi",
        );
      } else if (error.response.data.message.point_minimal) {
        throw new Error(
          error.response.data.message.point_minimal[0] ||
            "Point minimal mata pelajaran harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitMataPelajaran,
  });

  return { ...mutate };
};
