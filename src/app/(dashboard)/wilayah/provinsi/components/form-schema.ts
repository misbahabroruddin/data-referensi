import { z } from "zod";

export const FormSchema = z.object({
  negara_id: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      message: "Negara Harus diisi",
    },
  ),
  nama: z
    .string({
      required_error: "Nama harus diisi",
    })
    .min(1, {
      message: "Nama harus diisi",
    }),
  kode: z
    .string({
      required_error: "Kode harus diisi",
    })
    .min(1, {
      message: "Kode harus diisi",
    }),
});
