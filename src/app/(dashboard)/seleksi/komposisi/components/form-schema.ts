import { z } from "zod";

export const FormSchema = z.object({
  komposisi: z
    .string({
      required_error: "Komposisi harus diisi",
    })
    .min(1, {
      message: "Komposisi harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode harus diisi",
    })
    .min(2, {
      message: "Kode minimal 2 angka",
    }),
  keterangan: z.string().optional(),
});
