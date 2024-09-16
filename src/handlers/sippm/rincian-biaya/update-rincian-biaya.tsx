"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateRincianBiaya = (rincianBiayaId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitRincianBiaya = async (form: FormRincianBiaya) => {
    const reqBody: FormRincianBiaya = {
      rincian: form.rincian,
      anggaran: form.anggaran,
    };

    try {
      const { data } = await axios.put(
        `/sippm/rincian-biayas/${rincianBiayaId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-rincian-biaya"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-rincian-biaya"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-rincian-biaya"],
      });

      toast.success("Rincian biaya berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.rincian) {
        throw new Error(
          error.response.data.message.rincian[0] || "Rincian harus diisi",
        );
      } else if (error.response.data.message.anggaran) {
        throw new Error(
          error.response.data.message.anggaran[0] || "Anggaran harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitRincianBiaya,
  });

  return { ...mutate };
};
