"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateJabatanFungsional = (jabatanFungsionalId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitJabatanFungsional = async (form: FormJabatanFungsional) => {
    let reqBody: FormJabatanFungsional = {
      nama: form.nama,
    };

    if (form.keterangan) {
      reqBody = {
        ...reqBody,
        keterangan: form.keterangan,
      };
    }

    try {
      const { data } = await axios.put(
        `/jabatan/jabatan-fungsionals/${jabatanFungsionalId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-jabatan-fungsional"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-jabatan-fungsional"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-jabatan-fungsional"],
      });

      toast.success("Jabatan Fungsional berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] ||
            "Nama jabatan fungsional harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan jabatan fungsional harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitJabatanFungsional,
  });

  return { ...mutate };
};
