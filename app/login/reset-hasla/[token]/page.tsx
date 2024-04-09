"use client";

import styles from "./page.module.css";
import { Player } from "@lottiefiles/react-lottie-player";
import reset from "@/public/Login/reset.json";
import { motion } from "framer-motion";
import PasswordResetForm from "@/components/dashboard/PasswordResetForm";

const baseURL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export default function ({ params }: { params: { token: string } }) {
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
        <Player loop autoplay src={reset} />
      </motion.div>
      <motion.div
        variants={animation}
        transition={transition}
        className={styles.messageWrapper}
      >
        <h3>Zresetuj hasło</h3>
      </motion.div>
      <motion.div
        variants={animation}
        transition={transition}
        className={styles.formWrapper}
      >
        <PasswordResetForm token={params.token} />
      </motion.div>
    </motion.main>
  );
}
