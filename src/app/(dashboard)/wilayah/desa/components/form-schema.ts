import { z } from "zod";

export const FormSchema = z.object({
  kecamatan_id: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      message: "Kecamatan Harus diisi",
    },
  ),
  nama: z
    .string({
      required_error: "Nama desa harus diisi",
    })
    .min(1, {
      message: "Nama desa harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode desa harus diisi",
    })
    .min(8, {
      message: "Kode desa minimal 8 angka",
    }),
});
