"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateGelombang = (gelombangId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitGelombang = async (form: FormGelombang) => {
    let reqBody: FormGelombang = {
      gelombang: form.gelombang,
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
        `/pendaftaran/gelombangs/${gelombangId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-gelombang"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-gelombang"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-gelombang"],
      });

      toast.success("Gelombang berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.gelombang) {
        throw new Error(
          error.response.data.message.gelombang[0] || "Gelombang harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] || "Kode gelombang harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan gelombang harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitGelombang,
  });

  return { ...mutate };
};
