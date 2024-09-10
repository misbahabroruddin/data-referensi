import { z } from "zod";

export const FormSchema = z.object({
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
  rentang: z
    .string({
      required_error: "Rentang harus diisi",
    })
    .min(1, {
      message: "Rentang harus diisi",
    }),
  point_kip_kuliah: z
    .string({
      required_error: "Point KIP kuliah harus diisi",
    })
    .min(1, {
      message: "Point KIP kuliah harus diisi",
    }),
});
