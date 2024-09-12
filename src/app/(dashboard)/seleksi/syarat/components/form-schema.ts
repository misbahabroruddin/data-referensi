import { z } from "zod";

export const FormSchema = z.object({
  kode: z.string({ required_error: "Kode harus diisi" }).min(1, {
    message: "Kode harus diisi",
  }),
  nama: z.string({ required_error: "Nama harus diisi" }).min(1, {
    message: "Nama harus diisi",
  }),
  point: z
    .string({ required_error: "Point harus diisi" })
    .min(1, { message: "Point harus diisi" }),
});
