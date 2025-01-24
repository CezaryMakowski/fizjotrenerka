"use client";

import styles from "./page.module.css";
import { Player } from "@lottiefiles/react-lottie-player";
import notActive from "@/public/Login/not-active.json";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export default function Success() {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const animation = {
    initial: { y: 50, opacity: 0, scale: 0.7 },
    animate: { y: 0, opacity: 1, scale: 1 },
  };

  const transition = {
    duration: 0.2,
    type: "spring",
    mass: 0.5,
    stiffness: 200,
  };

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setIsSuccess(false);
    setIsError(false);
    try {
      const res = await fetch(
        `${baseURL}/api/sendtokenagain/${email.toLowerCase()}`
      );
      if (!res.ok) {
        setIsError(true);
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    setIsSuccess(true);
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      transition={{
        staggerChildren: 0.1,
      }}
      className={styles.main}
    >
      <motion.div
        variants={animation}
        transition={transition}
        className={styles.lottie}
      >
        {typeof window !== "undefined" && (
          <Player loop autoplay src={notActive} />
        )}
      </motion.div>
      <motion.div
        variants={animation}
        transition={transition}
        className={styles.messageWrapper}
      >
        <h3>Twoje konto nie jest aktywne</h3>
        <p>
          Aktywuj konto poprzez link aktywacyjny, który ci wysłałam na maila
        </p>
      </motion.div>
      <motion.div
        variants={animation}
        transition={transition}
        className={styles.resendWrapper}
      >
        <p>wysłać ci go jeszcze raz?</p>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="twój mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            wyślij
          </button>
        </form>
      </motion.div>
      {isSuccess && <p style={{ color: "green" }}>udało się, sprawdź maila</p>}
      {isError && <p style={{ color: "red" }}>coś poszło nie tak</p>}
    </motion.main>
  );
}
