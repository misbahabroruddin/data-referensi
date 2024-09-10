"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdatePenghasilan = (penghasilanId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitPenghasilan = async (form: FormPenghasilan) => {
    const reqBody: FormPenghasilan = {
      nama: form.nama,
      kode: form.kode,
      rentang: form.rentang,
      point_kip_kuliah: form.point_kip_kuliah,
    };

    try {
      const { data } = await axios.put(
        `/biodata/penghasilans/${penghasilanId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-penghasilan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-penghasilan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-penghasilan"],
      });

      toast.success("Penghasilan berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama penghasilan harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] || "Kode penghasilan harus diisi",
        );
      } else if (error.response.data.message.rentang) {
        throw new Error(
          error.response.data.message.rentang[0] ||
            "Rentang penghasilan harus diisi",
        );
      } else if (error.response.data.message.point_kip_kuliah) {
        throw new Error(
          error.response.data.message.point_kip_kuliah[0] ||
            "Point KIP kuliah penghasilan harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitPenghasilan,
  });

  return { ...mutate };
};
