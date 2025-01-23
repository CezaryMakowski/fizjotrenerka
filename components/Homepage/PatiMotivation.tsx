import Image from "next/image";
import blobPati from "@/public/Index/PatiMotywejszyn-blob.svg";
import pati from "@/public/Index/Pati-Motywacja.png";
import styles from "@/components/Homepage/PatiMotivation.module.css";

export default function PatiMotywejszyn() {
  return (
    <section className={styles.section}>
      <div className={styles.infoWrapper}>
        <h1>Trenerka inaczej</h1>
        <p>
          Odkryj swoją najlepszą wersję podczas treningu ze mną - osiągnij cele
          fitnessu szybciej, skuteczniej i z przyjemnością. Daj sobie szansę na
          transformację już dziś!
        </p>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.blobWrapper}>
          <Image priority src={blobPati} alt="Patimotywejszyn Blob" />
          <h3>treningi</h3>
          <h3>masaże</h3>
          <h3>zdrowie</h3>
        </div>
        <Image
          priority
          className={styles.pati}
          placeholder="blur"
          src={pati}
          alt="pati-szpagat"
        />
      </div>
    </section>
  );
}
