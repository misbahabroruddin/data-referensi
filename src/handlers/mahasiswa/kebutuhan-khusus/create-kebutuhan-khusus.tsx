"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useCreateKebutuhanKhusus = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitKebutuhanKhusus = async (form: FormKebutuhanKhusus) => {
    const reqBody: FormKebutuhanKhusus = {
      kebutuhan_khusus: form.kebutuhan_khusus,
      kode: form.kode,
    };

    try {
      const { data } = await axios.post(
        `/mahasiswa/kebutuhan-khususes`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-kebutuhan-khusus"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-kebutuhan-khusus"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kebutuhan_khusus"],
      });

      toast.success("Kebutuhan khusus berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.kebutuhan_khusus) {
        throw new Error(
          error.response.data.message.kebutuhan_khusus[0] ||
            "Kebutuhan khusus harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] ||
            "Kode kebutuhan khusus harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitKebutuhanKhusus,
  });

  return { ...mutate };
};
