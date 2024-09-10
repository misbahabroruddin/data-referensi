import { z } from "zod";

export const FormSchema = z.object({
  nama: z
    .string({
      required_error: "Nama harus diisi",
    })
    .min(1, {
      message: "Nama harus diisi",
    }),
  daerah_asal: z
    .string({
      required_error: "Daerah asal harus diisi",
    })
    .min(1, {
      message: "Daerah asal harus diisi",
    }),
});
