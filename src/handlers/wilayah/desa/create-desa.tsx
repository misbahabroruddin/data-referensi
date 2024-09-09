"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateDesa = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitDesa = async (form: FormDesa) => {
    let reqBody: FormDesa = {
      kecamatan_id: form.kecamatan_id.value,
      nama: form.nama,
    };

    if (form.kode) {
      reqBody = {
        ...reqBody,
        kode: form.kode,
      };
    }

    try {
      const { data } = await axios.post(`/wilayah/desas`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-desa"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-desa"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-desa"],
      });

      toast.success("Desa berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] || "Kode harus diisi",
        );
      } else if (error.response.data.message.kecamatan_id) {
        throw new Error(
          error.response.data.message.kecamatan_id[0] ||
            "Kecamatan harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitDesa,
  });

  return { ...mutate };
};
