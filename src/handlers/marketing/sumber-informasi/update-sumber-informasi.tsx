"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateSumberInformasi = (sumberInformasiId: number) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitSumberInformasi = async (form: FormSumberInformasi) => {
    const reqBody: FormSumberInformasi = {
      sumber_informasi: form.sumber_informasi,
    };

    try {
      const { data } = await axios.put(
        `/marketing/sumber-informasis/${sumberInformasiId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-sumber-informasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-sumber-informasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-sumber-informasi"],
      });

      toast.success("SumberInformasi berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.sumber_informasi) {
        throw new Error(
          error.response.data.message.sumber_informasi[0] ||
            "Sumber informasi harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitSumberInformasi,
  });

  return { ...mutate };
};
