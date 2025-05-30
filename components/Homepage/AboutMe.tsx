import styles from "./AboutMe.module.css";
import Image from "next/image";
import pati from "@/public/Index/Pati-AboutMe-Home.png";
import blob1 from "@/public/Index/Aboutme-blob1.svg";
import blob2 from "@/public/Index/Aboutme-blob2.svg";
import blobCzapka from "@/public/Index/Blob-Biret.svg";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section className={styles.section}>
      <Image className={styles.top} src={blob1} alt="Fizjotrenerka-blob1" />
      <Image className={styles.bottom} src={blob2} alt="Fizjotrenerka-blob2" />
      <div className={styles.background}></div>
      <Image
        className={styles.hat}
        src={blobCzapka}
        alt="Fizjotrenerka-blob1"
      />
      <div className={styles.wrapper}>
        <Image src={pati} alt="kilka-słów-o-fizjotrenerka" />
        <div style={{ position: "relative" }}>
          <h2 className={styles.title}>Kim jestem?</h2>
          <h3>Fizjoterapeutką i Trenerką</h3>
          <p>
            Jestem studentką fizjoterapii na Wyższej Szkole Edukacji i Terapii w
            Szczecinie. Treningi prowadzę w Centrum Treningu Personalnego
            Mateusz Andrzejak przy Rapackiego 3 w Szczecinie. Od dziecka jestem
            związana ze sportem i sztuką taneczną.
          </p>
          <Link href={"/o-mnie"}>
            <button>Czytaj Więcej</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
