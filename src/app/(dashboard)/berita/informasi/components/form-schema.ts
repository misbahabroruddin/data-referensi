import { z } from "zod";

export const FormSchema = z.object({
  judul: z
    .string({
      required_error: "Judul harus diisi",
    })
    .min(1, {
      message: "Judul harus diisi",
    }),
  url: z
    .string({
      required_error: "URL harus diisi",
    })
    .min(1, {
      message: "URL harus diisi",
    })
    .url({ message: "URL tidak valid" }),
  urutan: z
    .string({
      required_error: "Urutan harus diisi",
    })
    .min(1, {
      message: "Urutan harus diisi",
    }),
  status: z.boolean().default(false),
});
