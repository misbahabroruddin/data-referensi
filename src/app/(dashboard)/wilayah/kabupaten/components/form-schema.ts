import { z } from "zod";

export const FormSchema = z.object({
  provinsi_id: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      message: "Provinsi Harus diisi",
    },
  ),
  nama: z
    .string({
      required_error: "Nama kabupaten harus diisi",
    })
    .min(1, {
      message: "Nama kabupaten harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode kabupaten harus diisi",
    })
    .min(5, {
      message: "Kode kabupaten minimal 5 angka",
    }),
});
