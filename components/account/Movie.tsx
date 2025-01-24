"use client";

import Image from "next/image";
import styles from "./Movie.module.css";
import playBtn from "@/public/Dashboard/playBtn.svg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "next-video";
import { Asset } from "next-video/dist/assets";

type Params = {
  imageSrc: string;
  title: string;
  src: string;
  duration: string;
};

export default function Movie({ imageSrc, title, duration, src }: Params) {
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState<Asset>();
  const source = src.split("/")[src.split("/").length - 1];

  useEffect(() => {
    const videoPath: Asset = require(`@/videos/${source}`).default;
    console.log(videoPath);
    setVideoSrc(videoPath);
  }, [src]);

  return (
    <div className={styles.container}>
      {!videoVisible && (
        <>
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            onClick={() => setVideoVisible(true)}
            className={styles.thumbnailWrapper}
          >
            <Image
              className={styles.thumbnail}
              src={imageSrc}
              alt="miniaturka filmu"
              width={500}
              height={500}
            />
            <Image
              className={styles.playBtn}
              src={playBtn}
              alt="przycisk odtwarzania"
            />
          </motion.div>
          <motion.div
            animate={{ x: 0, scaleY: 1, opacity: 1 }}
            initial={{ x: -200, scaleY: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1, type: "spring" }}
            className={styles.infoWrapper}
          >
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.duration}>{duration}</p>
          </motion.div>
        </>
      )}
      {videoVisible && (
        <motion.div
          initial={{ scaleY: 0, scaleX: 0.5, opacity: 0 }}
          animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.3, type: "spring" }}
          className={styles.videoWrapper}
        >
          <div
            onClick={() => setVideoVisible(false)}
            className={styles.turnOff}
          ></div>
          <div className={styles.video}>
            <VideoPlayer src={videoSrc} accentColor="#578cb5" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
