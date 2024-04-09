"use client";

import { useForm } from "react-hook-form";
import styles from "./RegistrationForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormInput, formSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TFormInput>({ resolver: zodResolver(formSchema) });
  const [isUnknownError, setIsUnknownError] = useState(false);

  async function onSubmit(data: TFormInput) {
    setIsUnknownError(false);
    let URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
    try {
      const res = await fetch(`${URL}/api/registration`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await res.json();

      if (responseData.error?.email) {
        setError("email", {
          type: "server",
          message: responseData.error.email,
        });
      } else if (!res.ok) {
        throw new Error(res.statusText);
      }
      if (res.ok)
        router.push(
          `/rejestracja/sukces?name=${data.name}&email=${data.email}`
        );
    } catch (error) {
      console.error(error);
      setIsUnknownError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputWrapper}>
        <label htmlFor="name">Imię:</label>
        <input {...register("name")} id="name" />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="surename">Nazwisko:</label>
        <input {...register("surename")} id="surename" />
        {errors.surename && (
          <p className={styles.error}>{errors.surename.message}</p>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="email">Email:</label>
        <input {...register("email")} type="email" id="email" />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="password">Hasło:</label>
        <input {...register("password")} type="password" id="password" />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="confirmPassword">Powtórz hasło:</label>
        <input
          {...register("confirmPassword")}
          type="password"
          id="confirmPassword"
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Zarejestruj
      </button>
      <div
        className={
          isUnknownError
            ? `${styles.unknownError} ${styles.active}`
            : styles.unknownError
        }
      >
        <p>coś poszło nie tak, spróbuj ponownie później</p>
      </div>
    </form>
  );
}
