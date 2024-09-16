"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAxios } from "@/lib/hooks/use-axios";
import { useErrorHandling } from "@/lib/utils/error-handler";

export const useUpdateProgram = (programId: number) => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { errorHandler } = useErrorHandling();

  const onSubmitProgram = async (form: FormProgram) => {
    const reqBody: FormProgram = {
      nama: form.nama,
    };

    try {
      const { data } = await axios.put(
        `/marketing/programs/${programId}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-program"],
      });

      queryClient.removeQueries({
        queryKey: ["get-all-trash-program"],
      });

      queryClient.removeQueries({
        queryKey: ["get-search-program"],
      });

      toast.success("Program berhasil diperbarui");

      return data;
    } catch (error: any) {
      if (error.response.data.message.nama) {
        throw new Error(
          error.response.data.message.nama[0] || "Namas harus diisi",
        );
      }

      errorHandler(error);
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitProgram,
  });

  return { ...mutate };
};