import { z } from "zod";

export const FormSchema = z.object({
  nama: z
    .string({
      required_error: "Nama harus diisi",
    })
    .min(1, {
      message: "Nama harus diisi",
    }),
  size: z
    .string({
      required_error: "Ukuran dokumen harus diisi",
    })
    .min(1, {
      message: "Ukuran dokumen harus diisi",
    }),
});
