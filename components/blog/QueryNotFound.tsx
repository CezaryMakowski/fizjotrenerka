"use client";

import dynamic from "next/dynamic";
import styles from "./QueryNotFound.module.css";
import notFoundAnim from "@/public/Blog/not-found-animation.json";
import { motion } from "framer-motion";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function QueryNotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Player autoplay loop src={notFoundAnim} />
      </motion.div>
      <motion.p
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {"Niestety nic nie znaleziono :("}
      </motion.p>
    </div>
  );
}
