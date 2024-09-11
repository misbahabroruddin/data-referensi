"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateTransportasi = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitTransportasi = async (form: FormTransportasi) => {
    const reqBody: FormTransportasi = {
      transportasi: form.transportasi,
      kode: form.kode,
    };

    try {
      const { data } = await axios.post(`/mahasiswa/transportasis`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-transportasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-transportasi"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-transportasi"],
      });

      toast.success("Transportasi berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.transportasi) {
        throw new Error(
          error.response.data.message.transportasi[0] ||
            "Transportasi harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode transportasi harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitTransportasi,
  });

  return { ...mutate };
};
