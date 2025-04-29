import styles from "./Courses.module.css";
import Image from "next/image";
import blobBooty from "@/public/Index/kursy-fizjotrenerka-blob-BeautyBooty.svg";
import blobPole from "@/public/Index/kursy-fizjotrenerka-blob-poleandburner.svg";
import Link from "next/link";

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
            Zestaw stworzony z myślą o kobietach, które marzą o pośladkach
            niczym J.Lo bez skalpela. Jest to zbiór ćwiczeń, które pomogą
            uzyskać wymarzone kształtne pośladki.
          </p>
          <button>
            <Link href={"/sklep#BB"}>czytaj więcej</Link>
          </button>
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
            Cardio w innej formie niż bieganie czy rowerek stacjonarny. Jeśli
            lubisz się spocić, polepszyć swoją wydolność to na pewno polubisz
            się z tym programem.
          </p>
          <button>
            <Link href={"/sklep#cardio"}>czytaj więcej</Link>
          </button>
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
            Wzmocnij się pod rurkę! Trening skierowany do osób trenujących
            akrobatykę na drążku pionowym, czyli pole dance i chcą w bezpieczny
            sposób zwiększać swoje możliwości treningowe.
          </p>
          <button>
            <Link href={"/sklep#poleCon"}>czytaj więcej</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
