import styles from "./Achievements.module.css";
import Image from "next/image";
import medal from "@/public/AboutMe/o-mnie-medal.svg";
import curvedLine from "@/public/AboutMe/AboutMe-curved-line-2.svg";
import blob from "@/public/AboutMe/AboutMe-blob.svg";

export default function Achievements() {
  return (
    <section className={styles.section}>
      <Image
        className={styles.curvedLine}
        src={curvedLine}
        alt="o-mnie-różowa-linia"
      />
      <Image className={styles.blob} src={blob} alt="o-mnie-blob" />
      <Image className={styles.medal} src={medal} alt="o-mnie-medal" />
      <h2>Moje Osiągnięcia</h2>
      <h3>Zawody 2023</h3>
      <ul>
        <li>I miejsce w wyścigu szczurów</li>
        <li>3 miejsca w zawodach o to kto będzie ostatni</li>
      </ul>
      <h3>Zawody 2022</h3>
      <ul>
        <li>4 Miejsce w spinaniu mięśni na czas</li>
        <li>1 Miejsce w zawodach nieistotnych</li>
        <li>2 miejsce w czymś jeszcze</li>
      </ul>
      <h3>Zawody 2021</h3>
      <ul>
        <li>5 Miejsce w zawodach o 5 miejsce</li>
        <li>Ostatnie miejsce w Zawodach “Ostatni będą pierwszymi“</li>
        <li>Dyskwalifikacja z zawodów dla bezdomnych</li>
      </ul>
    </section>
  );
}
