import * as z from "zod/v4";

const errorMessages = {
  required: "Este campo é obrigatório.",
  invalid: "O valor inserido é inválido.",
  minLength: "O valor deve ter pelo menos 8 caracteres.",
  maxLength: "O valor deve ter no máximo 20 caracteres.",
  uppercase: "O valor deve conter pelo menos uma letra maiúscula.",
  lowercase: "O valor deve conter pelo menos uma letra minúscula.",
  number: "O valor deve conter pelo menos um número.",
  specialCharacter:
    "O valor deve conter pelo menos um caractere especial (!@#$%^&*).",
  email: "O e-mail deve ser válido, no formato m@example.com",
};

const passwordValidation = z
  .string()
  .min(8, { message: errorMessages.minLength })
  .max(20, { message: errorMessages.maxLength })
  .refine((password) => /[A-Z]/.test(password), {
    message: errorMessages.uppercase,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: errorMessages.lowercase,
  })
  .refine((password) => /[0-9]/.test(password), {
    message: errorMessages.number,
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: errorMessages.specialCharacter,
  });

export const userSchema = z.object({
  email: z.email({ message: errorMessages.email }),
  password: passwordValidation,
});

export const registerSchema = z.object({
  email: z.email({ message: errorMessages.email }),
  username: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
    .max(20, { message: "O nome deve ter no máximo 20 caracteres." }),
  passwordValues: z
    .object({
      password: passwordValidation,
      confirmPassword: passwordValidation,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem.",
      path: ["confirmPassword"],
    }),
});
