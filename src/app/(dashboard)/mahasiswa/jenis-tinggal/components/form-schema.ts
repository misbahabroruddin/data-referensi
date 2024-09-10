import { z } from "zod";

export const FormSchema = z.object({
  jenis_tinggal: z
    .string({
      required_error: "Jenis tinggal harus diisi",
    })
    .min(1, {
      message: "Jenis tinggal harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode harus diisi",
    })
    .min(2, {
      message: "Kode minimal 2 angka",
    }),
});
