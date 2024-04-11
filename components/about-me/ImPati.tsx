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
          Jestem osobą z pasją do pomagania ludziom w osiąganiu swoich celów
          zdrowotnych i fitnessowych. Moja przygoda z tą dziedziną rozpoczęła
          się z fascynacji ludzkim ciałem i jego zdolnością do przystosowania
          się i wydajnego funkcjonowania. Od tego czasu poświęciłam się nie
          tylko nauce, ale także praktyce, aby być w stanie oferować moim
          pacjentom kompleksową opiekę. Dzięki mojemu doświadczeniu i wiedzy nie
          tylko pomagam w leczeniu urazów i dolegliwości, ale także wspieram w
          osiąganiu celów treningowych. Uwielbiam indywidualne podejście do
          każdej osoby, ponieważ każde ciało jest inne i wymaga szczególnej
          uwagi. Moim celem jest nie tylko przywrócenie zdrowia fizycznego, ale
          także budowanie motywacji i pewności siebie u moich podopiecznych, aby
          mogli czerpać radość z aktywnego stylu życia.
        </p>
      </div>
    </section>
  );
}
