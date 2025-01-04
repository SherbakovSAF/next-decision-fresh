import * as yup from "yup";
export const LoginSchema = yup
  .string()
  .required("Поле обязательное")
  .min(3, "Минимум 3 символа");

export const PasswordSchema = yup.string().required().min(6);
