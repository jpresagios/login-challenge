import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .refine(
      (value) => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value ?? ""),
      "Password must contain at least one letter and one digit"
    ),
});

export type FormSchemaData = z.infer<typeof schema>;
export { schema };
