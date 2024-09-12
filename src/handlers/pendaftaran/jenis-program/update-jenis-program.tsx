"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateJenisProgram = (jalurPendaftaranId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitJenisProgram = async (form: FormJenisProgram) => {
    let reqBody: FormJenisProgram = {
      jenis_program: form.jenis_program,
      is_ipc: form.is_ipc ? "1" : "0",
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
        `/pendaftaran/jenis-programs/${jalurPendaftaranId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jenis-program"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jenis-program"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jenis-program"],
      });

      toast.success("Jenis program berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.jenis_program) {
        throw new Error(
          error.response.data.message.jenis_program[0] ||
            "Jenis program harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode jenis program harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan jenis program harus diisi",
        );
      } else if (error.response.data.message.is_ipc) {
        throw new Error(
          error.response.data.message.is_ipc[0] || "IPC harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitJenisProgram,
  });

  return { ...mutate };
};
