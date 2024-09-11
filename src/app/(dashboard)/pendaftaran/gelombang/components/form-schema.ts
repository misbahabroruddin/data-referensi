import { z } from "zod";

export const FormSchema = z.object({
  gelombang: z
    .string({
      required_error: "Gelombang harus diisi",
    })
    .min(1, {
      message: "Gelombang harus diisi",
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
