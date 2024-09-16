import { z } from "zod";

export const FormSchema = z.object({
  rincian: z
    .string({
      required_error: "Rincian harus diisi",
    })
    .min(1, { message: "Rincian harus diisi" }),
  anggaran: z
    .string({
      required_error: "Anggaran harus diisi",
    })
    .min(1, { message: "Anggaran harus diisi" }),
});
