import styles from "./Appointments.module.css";
import Image from "next/image";
import icon from "@/public/Index/Umawianie-hantle.svg";
import underline from "@/public/Index/Umawianie-Fizjotrenerka-podkreślenie-tutył.svg";
import Link from "next/link";

export default function Appointments() {
  return (
    <section className={styles.section}>
      <div className={styles.titleWrapper}>
        <h2>Chcesz się umówić?</h2>
        <Image src={underline} alt="umawianie-tytuł-podreślenie" />
      </div>
      <div className={styles.container}>
        <div className={styles.wrapperPerso}>
          <Image src={icon} alt="fizjotrenerka-umawianie-hantle" />
          <h3>Trening personalny</h3>
          <p>
            Treningi stacjonarne odbywają się w Centrum Treningu Personalnego
            Mateusz Andrzejak przy Rapackiego 3 w Szczecinie w formie 1:1 lub
            1:2 (indywidualnie lub w parze).
          </p>
          <Link href={"/kontakt#contactForm"}>Zapisz się</Link>
        </div>
        <div className={styles.wrapperMassage}>
          <h3>Fizjoterapia</h3>
          <p style={{ marginTop: "1rem", paddingInline: "1.5em" }}>
            Dzięki indywidualnemu podejściu i specjalistycznej wiedzy, pomogę Ci
            w redukcji bólu, poprawie funkcji ruchowej i przywróceniu pełnej
            sprawności
          </p>
          <Link href={"/kontakt#contactForm"}>Zapisz się</Link>
        </div>
      </div>
    </section>
  );
}
