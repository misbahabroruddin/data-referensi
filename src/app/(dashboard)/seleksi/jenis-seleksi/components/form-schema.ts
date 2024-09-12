import { z } from "zod";

export const FormSchema = z.object({
  nama: z
    .string({
      required_error: "Nama harus diisi",
    })
    .min(1, {
      message: "Nama harus diisi",
    }),
  kelulusan: z
    .string({
      required_error: "Nama harus diisi",
    })
    .min(1, {
      message: "Nama harus diisi",
    }),
  wajib_ikut: z.boolean().default(false),
  pakai_ruangan: z.boolean().default(false),
  bebas_tes: z.boolean().default(false),
  cbt: z.boolean().default(false),
  upload_berkas: z.boolean().default(false),
  kode: z
    .string({
      required_error: "Kode harus diisi",
    })
    .min(2, {
      message: "Kode minimal 2 angka",
    }),
});
