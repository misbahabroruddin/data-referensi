import { z } from "zod";

export const FormSchema = z.object({
  kriteria_penilaian_id: z.object(
    {
      label: z.string(),
      value: z.number(),
    },
    {
      message: "Kriteria penilaian harus diisi",
    },
  ),
  nama: z
    .string({
      required_error: "Nama harus diisi",
    })
    .min(1, {
      message: "Nama harus diisi",
    }),
});
