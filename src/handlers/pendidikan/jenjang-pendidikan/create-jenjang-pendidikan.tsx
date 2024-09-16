"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateJenjangPendidikan = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitJenjangPendidikan = async (form: FormJenjangPendidikan) => {
    const reqBody: FormJenjangPendidikan = {
      nama: form.nama,
      kode: form.kode,
      keterangan: form.keterangan,
    };

    try {
      const { data } = await axios.post(
        `/pendidikan/jenjang-pendidikans`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenjang-pendidikan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenjang-pendidikan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenjang-pendidikan"],
      });

      toast.success("Jenjang pendidikan berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode jenjang pendidikan harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan jenjang pendidikan harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitJenjangPendidikan,
  });

  return { ...mutate };
};
