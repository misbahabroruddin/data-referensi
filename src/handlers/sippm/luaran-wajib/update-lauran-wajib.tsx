"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateLuaranWajib = (luaranWajibId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitLuaranWajib = async (form: FormLuaranWajib) => {
    let reqBody: FormLuaranWajib = {
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
        `/sippm/luaran-wajibs/${luaranWajibId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-luaran-wajib"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-luaran-wajib"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-luaran-wajib"],
      });

      toast.success("Luaran wajib berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] ||
            "Nama luaran wajib harus diisi",
        );
      } else if (error.response.data.message.keterangan) {
        throw new Error(
          error.response.data.message.keterangan[0] ||
            "Keterangan luaran wajib harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitLuaranWajib,
  });

  return { ...mutate };
};
