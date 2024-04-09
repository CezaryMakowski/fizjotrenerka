"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./LoginForm.module.css";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type TFormInput = {
  email: string;
  password: string;
};

export default function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/konto";
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFormInput>();

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email.toLowerCase(),
        password: data.password,
      });
      if (!res?.error) {
        router.push(callbackUrl);
      } else if (res?.error === "not active") {
        router.push("/login/nie-aktywny");
      } else {
        setError("niepoprawny email lub hasło");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor="email">Email:</label>
      <input {...register("email")} required id="email" />
      {error && <p className={styles.error}>{error}</p>}
      <label htmlFor="password">Hasło:</label>
      <input {...register("password")} required type="password" id="password" />
      <button type="submit" disabled={isSubmitting}>
        Zaloguj
      </button>
    </form>
  );
}
