import { z } from "zod";

export const FormSchema = z.object({
  nama_penilaian: z
    .string({
      required_error: "Nama penilaian harus diisi",
    })
    .min(1, {
      message: "Nama penilaian harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode  harus diisi",
    })
    .min(1, {
      message: "Kode harus diisi",
    }),
  nilai: z
    .string({
      required_error: "Nilai harus diisi",
    })
    .min(1, { message: "Nilai harus diisi" }),
  mata_pelajaran_id: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      message: "Kecamatan Harus diisi",
    },
  ),
  keterangan: z.string().optional(),
});
