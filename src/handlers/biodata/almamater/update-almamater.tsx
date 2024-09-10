"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateAlmamater = (almamaterId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitAlmamater = async (form: FormAlmamater) => {
    const reqBody: FormAlmamater = {
      ukuran: form.ukuran,
      kode: form.kode,
      lingkar_dada: form.lingkar_dada,
      panjang_badan: form.panjang_badan,
      panjang_lengan: form.panjang_lengan,
    };

    try {
      const { data } = await axios.put(
        `/biodata/ukuran-jas-almamaters/${almamaterId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-ukuran-jas-almamater"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-ukuran-jas-almamater"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-ukuran-jas-almamater"],
      });

      toast.success("Almamater berhasil ditambahkan");

      return data;
    } catch (error: any) {
      if (error.response.data.message.ukuran) {
        throw new Error(
          error.response.data.message.ukuran[0] ||
            "Ukuran almamater harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] || "Kode almamater harus diisi",
        );
      } else if (error.response.data.message.lingkar_dada) {
        throw new Error(
          error.response.data.message.lingkar_dada[0] ||
            "Lingkar dada almamater harus diisi",
        );
      } else if (error.response.data.message.panjang_lengan) {
        throw new Error(
          error.response.data.message.panjang_lengan[0] ||
            "Panjang lengan almamater harus diisi",
        );
      } else if (error.response.data.message.panjang_badan) {
        throw new Error(
          error.response.data.message.panjang_badan[0] ||
            "Panjang badan almamater harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitAlmamater,
  });

  return { ...mutate };
};
