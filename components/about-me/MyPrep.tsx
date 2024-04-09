import styles from "./MyPrep.module.css";
import Image from "next/image";
import blueBackground from "@/public/AboutMe/o-mnie-background-blue.svg";
import pinkBackground from "@/public/AboutMe/o-mnie-background-pink.svg";

export default function MyPrep() {
  return (
    <section className={styles.section}>
      <h2>Moje Przygotowanie</h2>
      <div className={styles.container}>
        <div className={styles.infoWrapper}>
          <Image
            className={styles.blueBackground}
            src={blueBackground}
            alt="przygotowanie sportowe tło"
          />
          <h3>Przygotowanie Sportowe</h3>
          <ul>
            <li>Od dziecka trenuję taniec</li>
            <li>4 lata byłam instruktorem pole dance</li>
            <li>3 lata trenuję z najlepszymi trenerami w Polsce</li>
            <li>osiągnęłam podium w zawodach sylwetkowych</li>
          </ul>
        </div>
        <div className={styles.infoWrapper}>
          <Image
            className={styles.pinkBackground}
            src={pinkBackground}
            alt="przygotowanie sportowe tło"
          />
          <h3>Przygotowanie Fizjoterapeutyczne</h3>
          <ul>
            <li>uczęszczałam do Akademii wychowania fizycznego</li>
            <li>Ukończyłam wyższą szkołę fizjoterapii</li>
            <li>Pracowałam 2 lata w przychodni</li>
            <li>posiadam kurs masażu</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
