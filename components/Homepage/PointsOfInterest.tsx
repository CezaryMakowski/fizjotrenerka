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
        <h3>Fizjoterapia</h3>
        <p>
          Fizjoterapia czyli powrót do sprawności fizycznej poprzez terapię
          manualną i kinezyterapię, czyli terapię ruchem.
        </p>
      </div>
      <div className={styles.wrapper}>
        <Image src={blobMassage} alt="masaże-Fizjotrenerka" />
        <h3>Masaż</h3>
        <p>
          Masaż klasyczny lub relaksacyjny może być doskonałą formą
          uzupełniającą Twoją regenerację lub po prostu chwilą relaksu.
        </p>
      </div>
      <div className={styles.wrapper}>
        <Image src={blobDeadPress} alt="Trening-to-życie" />
        <h3>Treningi</h3>
        <p>
          Trening z wykorzystaniem własnej masy ciała lub trening siłowy to
          jedna z wielu form aktywności fizycznej, która wspomaga utrzymanie
          zdrowia i kondycji.
        </p>
      </div>
    </section>
  );
}
