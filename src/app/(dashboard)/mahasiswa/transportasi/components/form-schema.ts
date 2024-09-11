import { z } from "zod";

export const FormSchema = z.object({
  transportasi: z
    .string({
      required_error: "Transportasi harus diisi",
    })
    .min(1, {
      message: "Transportasi harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode harus diisi",
    })
    .min(2, {
      message: "Kode minimal 2 angka",
    }),
});
