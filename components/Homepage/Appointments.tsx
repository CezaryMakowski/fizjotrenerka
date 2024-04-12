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
            Gotowy na transformację? Zapisz się na trening personalny już dziś i
            odkryj swoje pełne potencjału! Indywidualnie dopasowany program
            treningowy, profesjonalne wsparcie i motywacja - to wszystko czeka
            na Ciebie. Nie czekaj dłużej, zainwestuj w swoje zdrowie i kondycję
          </p>
          <Link href={"/kontakt#contactForm"}>Zapisz się</Link>
        </div>
        <div className={styles.wrapperMassage}>
          <h3>Fizjoterapia</h3>
          <p style={{ marginTop: "1rem", paddingInline: "1em" }}>
            Czy cierpisz na ból mięśni czy stawów? Czy potrzebujesz pomocy w
            rehabilitacji po urazie? Zapisz się na wizytę fizjoterapeutyczną i
            odzyskaj kontrolę nad swoim ciałem.
          </p>
          <p style={{ marginBottom: "1rem" }}>
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
