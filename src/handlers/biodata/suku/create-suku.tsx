"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateSuku = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitSuku = async (form: FormSuku) => {
    const reqBody: FormSuku = {
      nama: form.nama,
      daerah_asal: form.daerah_asal,
    };

    try {
      const { data } = await axios.post(`/biodata/sukus`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-suku"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-suku"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-suku"],
      });

      toast.success("Suku berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama suku harus diisi",
        );
      } else if (error.response.data.message.daerah_asal) {
        throw new Error(
          error.response.data.message.daerah_asal[0] ||
            "Daerah asal suku harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitSuku,
  });

  return { ...mutate };
};
