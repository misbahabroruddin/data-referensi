import { z } from "zod";

export const FormSchema = z.object({
  kategori: z
    .string({
      required_error: "Kategori harus diisi",
    })
    .min(1, {
      message: "Kategori harus diisi",
    }),
  deskripsi: z
    .string({
      required_error: "Deskripsi harus diisi",
    })
    .min(1, {
      message: "Deskripsi harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode harus diisi",
    })
    .min(2, {
      message: "Kode minimal 2 angka",
    }),
});
