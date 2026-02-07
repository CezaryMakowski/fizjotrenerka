"use client";

import styles from "./page.module.css";
import dynamic from "next/dynamic";
import sending from "@/public/Login/sending.json";
import { motion } from "framer-motion";
import { useState, use } from "react";

const baseURL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function Success({
  searchParams,
}: {
  searchParams: Promise<{ name: string; email: string }>;
}) {
  const params = use(searchParams);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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

  async function handler() {
    setLoading(true);
    setIsError(false);
    try {
      const res = await fetch(
        `${baseURL}/api/sendtokenagain/${params.email}`
      );
      if (!res.ok) {
        setIsError(true);
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.error(err);
    }
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
        <Player loop autoplay src={sending} />
      </motion.div>
      <motion.div
        variants={animation}
        transition={transition}
        className={styles.messageWrapper}
      >
        <h3>Cześć, {params.name}</h3>
        <p>
          Super, Twoje konto jest już prawie aktywne. Właśnie wysłałam ci maila
          zawierającego link aktywacyjny
        </p>
      </motion.div>
      <motion.div
        variants={animation}
        transition={transition}
        className={styles.resendWrapper}
      >
        <p>Nie otrzymałeś/łaś wiadomości?</p>
        <button onClick={handler} disabled={loading}>
          prześlij jeszcze raz
        </button>
      </motion.div>
      {isError && <p style={{ color: "red" }}>coś poszło nie tak</p>}
    </motion.main>
  );
}
