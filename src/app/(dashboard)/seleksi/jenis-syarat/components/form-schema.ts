import { z } from "zod";

export const FormSchema = z.object({
  jenis_syarat: z
    .string({
      required_error: "Jenis syarat harus diisi",
    })
    .min(1, {
      message: "Jenis syarat harus diisi",
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
