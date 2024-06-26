"use client";

import Image from "next/image";
import styles from "./Trailer.module.css";
import playBtn from "@/public/shop/playBtn.svg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoPlayer from "next-video";
import { Asset } from "next-video/dist/assets";

export default function Trailer({ src }: { src: Asset }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function switchOff() {
      setVisible(false);
    }

    window.addEventListener("click", switchOff);

    return () => window.removeEventListener("click", switchOff);
  }, []);

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setVisible(true);
        }}
        className={styles.playTrailer}
      >
        <Image src={playBtn} alt="Przycisk odtwarzania zwiastunu programu" />
        <p>Zobacz Zwiastun</p>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ scaleY: 0, scaleX: 0.5, opacity: 0 }}
            animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
            exit={{ scaleY: 0, scaleX: 0.5, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            className={styles.videoWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => setVisible(false)}
              className={styles.turnOff}
            ></div>
            <div className={styles.video}>
              <VideoPlayer src={src} accentColor="#578cb5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
