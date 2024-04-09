"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./PasswordResetForm.module.css";
import { TPasswordResetSchema, passwordResetSchema } from "@/lib/types";

export default function PasswordResetForm({ token }: { token: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TPasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
  });

  async function onSubmit(data: TPasswordResetSchema) {
    let URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
    try {
      const res = await fetch(`${URL}/api/resetpassword`, {
        method: "POST",
        body: JSON.stringify({ ...data, token }),
      });
      if (res.ok) router.push(`/login?isReset=true`);
      else throw new Error(res.statusText);
    } catch (error) {
      console.error(error);
      setError("confirmPassword", {
        type: "server",
        message: "coś poszło nie tak, spróbuj ponownie później",
      });
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="password">podaj nowe hasło</label>
      <input type="password" id="password" {...register("password")} />
      {errors.password && (
        <p className={styles.error}>{errors.password.message}</p>
      )}
      <label htmlFor="confirmPassword">powtórz hasło</label>
      <input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <p className={styles.error}>{errors.confirmPassword.message}</p>
      )}
      <button type="submit" disabled={isSubmitting}>
        zmień hasło
      </button>
    </form>
  );
}
