import { z } from "zod";

export const FormSchema = z.object({
  kabupaten_id: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      message: "Kabupaten Harus diisi",
    },
  ),
  nama: z
    .string({
      required_error: "Nama kecamatan harus diisi",
    })
    .min(1, {
      message: "Nama kecamatan harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode kecamatan harus diisi",
    })
    .min(8, {
      message: "Kode kecamatan minimal 8 angka",
    }),
});
