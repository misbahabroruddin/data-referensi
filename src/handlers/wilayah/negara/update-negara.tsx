"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateNegara = (negaraId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitNegara = async (form: FormNegara) => {
    let reqBody: FormNegara = {
      nama: form.nama,
    };

    if (form.kode_telepon) {
      reqBody = {
        ...reqBody,
        kode_telepon: form.kode_telepon,
      };
    }

    try {
      const { data } = await axios.put(
        `/wilayah/negaras/${negaraId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-negara"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-negara"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-negara"],
      });

      toast.success("Negara berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama harus diisi",
        );
      } else if (error.response.data.message.kode_telepon) {
        throw new Error(
          error.response.data.message.kode_telepon[0] ||
            "Deskripsi harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitNegara,
  });

  return { ...mutate };
};
