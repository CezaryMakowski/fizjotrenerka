"use client";

import styles from "./page.module.css";
import reset from "@/public/Login/reset.json";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

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
    setIsError(false);
    setIsSuccess(false);
    try {
      const res = await fetch(
        `${baseURL}/api/resetpassword/createtoken/${email.toLowerCase()}`,
        { method: "POST" },
      );
      if (!res.ok) {
        setIsError(true);
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.error(err);
    }
    setIsSuccess(true);
    setLoading(false);
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
        {typeof window !== "undefined" && <Player loop autoplay src={reset} />}
      </motion.div>
      <motion.div
        variants={animation}
        transition={transition}
        className={styles.messageWrapper}
      >
        <h3>Zresetuj swoje hasło</h3>
        <p>
          Po tym jak podasz swojego maila otrzymasz na niego wiadomość z
          instrukcjami dotyczącymi zmiany hasła
        </p>
      </motion.div>
      <motion.div
        variants={animation}
        transition={transition}
        className={styles.resendWrapper}
      >
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
      {isError && <p style={{ color: "red" }}>coś poszło nie tak</p>}
      {isSuccess && <p style={{ color: "green" }}>udało się, sprawdź maila</p>}
    </motion.main>
  );
}
