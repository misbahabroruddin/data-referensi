import { z } from "zod";

export const FormSchema = z.object({
  jenis_program: z
    .string({
      required_error: "Jalur pendaftaran harus diisi",
    })
    .min(1, {
      message: "Jalur pendaftaran harus diisi",
    }),
  is_ipc: z.boolean().default(false),
  kode: z
    .string({
      required_error: "Kode harus diisi",
    })
    .min(2, {
      message: "Kode minimal 2 angka",
    }),
  keterangan: z.string().optional(),
});
