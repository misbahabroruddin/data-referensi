"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateProvinsi = (provinsiId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitProvinsi = async (form: FormProvinsi) => {
    let reqBody: FormProvinsi = {
      negara_id: form.negara_id.value,
      nama: form.nama,
    };

    if (form.kode) {
      reqBody = {
        ...reqBody,
        kode: form.kode,
      };
    }

    try {
      const { data } = await axios.put(
        `/wilayah/provinsis/${provinsiId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-provinsi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-provinsi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-provinsi"],
      });

      toast.success("Provinsi berhasil diperbarui");

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
      } else if (error.response.data.message.negara_id) {
        throw new Error(
          error.response.data.message.negara_id[0] || "Negara harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitProvinsi,
  });

  return { ...mutate };
};
