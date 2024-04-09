import styles from "./PointsOfInterest.module.css";
import Image from "next/image";
import blobHeart from "@/public/Index/blob-ciekawostki-sport zdrowie.svg";
import blobMassage from "@/public/Index/blob-ciekawostki-masaż.svg";
import blobDeadPress from "@/public/Index/blob-ciekawostki-martwy.svg";

export default function CiekawostkaZdrowie() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <Image src={blobHeart} alt="Sport-to-zdrowie" />
        <h3>Trenuj zdrowie</h3>
        <p>
          Trening to klucz do zdrowia i kondycji! Regularne ćwiczenia zwiększają
          siłę mięśniową, poprawiają wydolność organizmu oraz wzmacniają kości.
          Dodatkowo, trening siłowy przyspiesza metabolizm, pomaga w utracie
          wagi i redukcji tkanki tłuszczowej
        </p>
      </div>
      <div className={styles.wrapper}>
        <Image src={blobMassage} alt="masaże-Fizjotrenerka" />
        <h3>Masaż</h3>
        <p>
          Masaż to nie tylko luksusowa przyjemność, to także klucz do zdrowia i
          dobrej kondycji. Redukuje stres, łagodzi napięcie mięśniowe, poprawia
          krążenie krwi oraz elastyczność skóry. Ciesz się relaksem i
          odprężeniem, jednocześnie dbając o swoje zdrowie dzięki regularnym
          sesjom masażu
        </p>
      </div>
      <div className={styles.wrapper}>
        <Image src={blobDeadPress} alt="Trening-to-życie" />
        <h3>Przyjemne treningi</h3>
        <p>
          Trenowanie to nie tylko wysiłek fizyczny, to również źródło niezwykłej
          przyjemności i satysfakcji. Każdy krok, każdy wysiłek przynosi
          poczucie osiągnięcia i wzmacnia naszą pewność siebie. Odkrywaj radość
          w pokonywaniu własnych granic i buduj swoje ciało oraz umysł, czerpiąc
          z tego niezapomniane doznania każdego dnia
        </p>
      </div>
    </section>
  );
}
