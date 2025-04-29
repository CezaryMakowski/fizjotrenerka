import styles from "./ImPati.module.css";
import Image from "next/image";
import curvedLine from "@/public/AboutMe/AboutMe-curved-line-1-section.svg";
import pati from "@/public/AboutMe/Fizjotrenerka-pati-o-mnie.png";

export default function ImPati() {
  return (
    <section className={styles.section}>
      <Image
        priority
        className={styles.curvedLine}
        src={curvedLine}
        alt="różowa-linia"
      />
      <Image
        priority
        className={styles.pati}
        src={pati}
        alt="Fizjotrenerka-pati-o-mnie"
      />
      <div className={styles.infoWrapper}>
        <h1>Cześć , Jestem Pati</h1>
        <h3>Trenerka i Fizjoterapeutka</h3>
        <p>
          Jestem studentką kierunku fizjoterapii na Wyższej Szkole Edukacji i
          Terapii. Od dziecka jestem związana ze sportem - od biegów
          krótkodystansowych, przez pływanie po bardziej artystyczne formy jak
          balet, czy taniec współczesny. Przeszłam przez wiele kontuzji, więc
          fizjoterapia i rehabilitacja w jakimś stopniu była obecna w moim życiu
          od strony pacjenta. Po kilku latach pracy jako instruktor fitness czy
          instruktor pole dance chciałam lepiej zrozumieć funkcjonowanie
          ludzkiego ciała, jak unikać kontuzji i jak pracować z osobami, które
          tych kontuzji doznały. I tak znalazłam się w tym miejscu, z którego
          pomagam innym wrócić i utrzymać sprawność i zdrowie.
        </p>
      </div>
    </section>
  );
}
