import { z } from "zod";

export const FormSchema = z.object({
  sistem_kuliah: z
    .string({
      required_error: "Sistem kuliah harus diisi",
    })
    .min(1, {
      message: "Sistem kuliah harus diisi",
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
