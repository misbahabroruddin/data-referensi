import { z } from "zod";

export const FormSchema = z.object({
  judul: z
    .string({
      required_error: "Judul harus diisi",
    })
    .min(1, {
      message: "Judul harus diisi",
    }),
  jenis_pendaftaran: z
    .string({
      required_error: "Jenis pendaftaran harus diisi",
    })
    .min(1, {
      message: "Jenis pendaftaran harus diisi",
    }),
  keterangan: z.string().optional(),
  tampil_beranda: z.boolean().default(false),
  tampil_pendaftaran: z.boolean().default(false),
});
