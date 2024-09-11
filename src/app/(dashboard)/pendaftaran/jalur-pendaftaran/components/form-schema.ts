import { z } from "zod";

export const FormSchema = z.object({
  jalur_pendaftaran: z
    .string({
      required_error: "Jalur pendaftaran harus diisi",
    })
    .min(1, {
      message: "Jalur pendaftaran harus diisi",
    }),
  jenis_pendaftaran: z
    .string({
      required_error: "Jenis pendaftaran harus diisi",
    })
    .min(1, {
      message: "Jenis pendaftaran harus diisi",
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
