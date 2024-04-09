import styles from "./Courses.module.css";
import Image from "next/image";
import blobBooty from "@/public/Index/kursy-fizjotrenerka-blob-BeautyBooty.svg";
import blobPole from "@/public/Index/kursy-fizjotrenerka-blob-poleandburner.svg";

export default function Courses() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Treningi Online</h2>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.titleBooty}>
            <Image
              src={blobBooty}
              alt="kursy-fizjotrenerka-blob-tytuł-BeautyBooty"
            />
            <h3>BeautyBooty</h3>
          </div>
          <p>
            Oto intensywny program treningowy zaprojektowany specjalnie dla
            tych, którzy pragną wzmocnić i powiększyć pośladki. Mój trening
            pomaga osiągnąć pożądane kształty i proporcje. Niezależnie od
            Twojego poziomu zaawansowania
          </p>
          <button>Czytaj więcej</button>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.titleBurner}>
            <Image
              src={blobPole}
              alt="kursy-fizjotrenerka-blob-tytuł-tytuł-fatBurner"
            />
            <h3>Cardio FatBurner</h3>
          </div>
          <p>
            Cardio Fatburner to intensywny program treningowy, który skupia się
            na spalaniu tkanki tłuszczowej i poprawy ogólnej wydolności
            organizmu. Ten program zapewnia szybkie i efektywne spalanie
            kalorii.
          </p>
          <button>Czytaj więcej</button>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.titlePole}>
            <Image
              src={blobPole}
              alt="kursy-fizjotrenerka-blob-PoleDance-conditioning"
            />
            <h3>PoleDance Conditioning</h3>
          </div>
          <p>
            Pole Dance Conditioning to innowacyjny program treningowy, który
            integruje elementy tańca na rurze z technikami wzmacniającymi i
            rozciągającymi. Program ten rozwija siłę rdzenia, wytrzymałość
            mięśniową i płynność ruchu.
          </p>
          <button>Czytaj więcej</button>
        </div>
      </div>
    </section>
  );
}
