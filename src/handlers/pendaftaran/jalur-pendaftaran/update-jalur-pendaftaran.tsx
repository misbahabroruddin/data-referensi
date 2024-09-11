"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateJalurPendaftaran = (jalurPendaftaranId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitJalurPendaftaran = async (form: FormJalurPendaftaran) => {
    let reqBody: FormJalurPendaftaran = {
      jalur_pendaftaran: form.jalur_pendaftaran,
      jenis_pendaftaran: form.jenis_pendaftaran,
      kode: form.kode,
    };

    if (form.keterangan) {
      reqBody = {
        ...reqBody,
        keterangan: form.keterangan,
      };
    }

    try {
      const { data } = await axios.put(
        `/pendaftaran/jalur-pendaftarans/${jalurPendaftaranId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jalur-pendaftaran"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jalur-pendaftaran"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jalur-pendaftaran"],
      });

      toast.success("Jalur pendaftaran berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.jalur_pendaftaran) {
        throw new Error(
          error.response.data.message.jalur_pendaftaran[0] ||
            "Jalur pendaftaran harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode jalur pendaftaran harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan jalur pendaftaran harus diisi",
        );
      } else if (error.response.data.message.jenis_pendaftaran) {
        throw new Error(
          error.response.data.message.jenis_pendaftaran[0] ||
            "Jenis pendaftaran harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitJalurPendaftaran,
  });

  return { ...mutate };
};
