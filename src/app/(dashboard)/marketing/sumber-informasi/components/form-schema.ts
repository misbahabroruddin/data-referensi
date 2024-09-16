import { z } from "zod";

export const FormSchema = z.object({
  sumber_informasi: z
    .string({
      required_error: "Sumber informasi harus diisi",
    })
    .min(1, {
      message: "Sumber informasi harus diisi",
    }),
});
