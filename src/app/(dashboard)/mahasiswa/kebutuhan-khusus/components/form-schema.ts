import { z } from "zod";

export const FormSchema = z.object({
  kebutuhan_khusus: z
    .string({
      required_error: "Kebutuhan khusus harus diisi",
    })
    .min(1, {
      message: "Kebutuhan khusus harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode harus diisi",
    })
    .min(2, {
      message: "Kode minimal 2 angka",
    }),
});
