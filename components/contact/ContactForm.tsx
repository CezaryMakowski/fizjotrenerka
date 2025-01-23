"use client";

import { useForm } from "react-hook-form";
import styles from "./ContactForm.module.css";
import { TContactFormSchema, contactFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TContactFormSchema>({ resolver: zodResolver(contactFormSchema) });
  const [isSuccess, setIsSuccess] = useState(false);

  async function onSubmit(data: TContactFormSchema) {
    let URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
    try {
      const res = await fetch(`${URL}/api/sendemail`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
        reset();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.wrapper}>
          <div>
            <label htmlFor="name">Imię:</label>
            <input {...register("name")} id="name" />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input {...register("email")} type="email" id="email" />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>
        </div>
        <label htmlFor="message">wiadomść:</label>
        <textarea {...register("message")} id="message" />
        {errors.message && (
          <p style={{ color: "red" }}>{errors.message.message}</p>
        )}
        <div className={styles.buttonWrapper}>
          <button type="submit" disabled={isSubmitting}>
            Wyślij
          </button>
        </div>
      </form>
      <AnimatePresence>
        {isSuccess && (
          <motion.p
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.5, y: "2rem", opacity: 0 }}
            className={styles.success}
          >
            {"udało się :)"}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
