import { z } from "zod";

export const FormSchema = z.object({
  ukuran: z
    .string({
      required_error: "Ukuran harus diisi",
    })
    .min(1, {
      message: "Ukuran harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode harus diisi",
    })
    .min(2, {
      message: "Kode minimal 2 angka",
    }),
  lingkar_dada: z
    .string({
      required_error: "Lingkar dada harus diisi",
    })
    .min(1, {
      message: "Lingkar dada harus diisi",
    }),
  panjang_lengan: z
    .string({
      required_error: "Panjang lengan harus diisi",
    })
    .min(1, {
      message: "Panjang lengan harus diisi",
    }),
  panjang_badan: z
    .string({
      required_error: "Panjang badan harus diisi",
    })
    .min(1, {
      message: "Panjang badan harus diisi",
    }),
});
