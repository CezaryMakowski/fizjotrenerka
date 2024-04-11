import Image from "next/image";
import styles from "./page.module.css";
import heartLine from "@/public/prices/heart-line.svg";
import pinkBlob from "@/public/prices/pink-blob.svg";
import blueBlob from "@/public/prices/blue-blob.svg";

export default function Cennik() {
  return (
    <main className={styles.main}>
      <Image
        priority
        className={styles.pinkBlob}
        src={pinkBlob}
        alt="różowy blob"
      />
      <Image
        priority
        className={styles.blueBlob}
        src={blueBlob}
        alt="niebieski blob"
      />
      <h1 className={styles.title}>Cennik</h1>
      <section className={styles.section}>
        <div className={styles.subTitle}>
          <Image priority src={heartLine} alt="podkreślenie tekstu" />
          <h3>Treningi Personalne</h3>
        </div>
        <div className={styles.infoWrapper}>
          <p>Trening Personalny - 110 zł</p>
        </div>
        <div className={`${styles.infoWrapper} ${styles.blue}`}>
          <p>{"Plan treningowy (online) - 200 zł"}</p>
        </div>
        <div className={styles.infoWrapper}>
          <p>Trening indywidualny pole dance/Exotic - 200 zł</p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.subTitle}>
          <Image
            className={styles.reversed}
            src={heartLine}
            alt="podkreślenie tekstu"
          />
          <h3>Masaże</h3>
        </div>
        <div className={styles.infoWrapper}>
          <p>60 minut - 120 zł</p>
        </div>
        <div className={`${styles.infoWrapper} ${styles.blue}`}>
          <p>30 minut - 80 zł</p>
        </div>
      </section>
    </main>
  );
}
