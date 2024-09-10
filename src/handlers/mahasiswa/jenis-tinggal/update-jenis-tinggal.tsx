"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateJenisTinggal = (jenisTinggalId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitJenisTinggal = async (form: FormJenisTinggal) => {
    const reqBody: FormJenisTinggal = {
      jenis_tinggal: form.jenis_tinggal,
      kode: form.kode,
    };

    try {
      const { data } = await axios.put(
        `/mahasiswa/jenis-tinggals/${jenisTinggalId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenis-tinggal"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenis-tinggal"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-tinggal"],
      });

      toast.success("Jenis tinggal berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.jenis_tinggal) {
        throw new Error(
          error.response.data.message.jenis_tinggal[0] ||
            "Jenis tinggal harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode jenis tinggal harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitJenisTinggal,
  });

  return { ...mutate };
};
