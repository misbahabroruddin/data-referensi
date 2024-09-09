"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateKecamatan = (kecamatanId: string) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitKecamatan = async (form: FormKecamatan) => {
    let reqBody: FormKecamatan = {
      kabupaten_id: form.kabupaten_id.value,
      nama: form.nama,
    };

    if (form.kode) {
      reqBody = {
        ...reqBody,
        kode: form.kode,
      };
    }

    try {
      const { data } = await axios.put(
        `/wilayah/kecamatans/${kecamatanId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-kecamatan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-kecamatan"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-kecamatan"],
      });

      toast.success("Kecamatan berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Nama harus diisi",
        );
      } else if (error.response.data.message.kode) {
        throw new Error(
          error.response.data.message.kode[0] || "Kode harus diisi",
        );
      } else if (error.response.data.message.kabupaten_id) {
        throw new Error(
          error.response.data.message.kabupaten_id[0] ||
            "Kabupaten harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitKecamatan,
  });

  return { ...mutate };
};
