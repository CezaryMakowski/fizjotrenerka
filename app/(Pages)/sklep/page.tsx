import Image from "next/image";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import underline from "@/public/shop/sklep-podkreślenie.svg";
import pati from "@/public/shop/Pati-sklep.png";
import lineBB2 from "@/public/shop/curvedline-beautybooty-2.svg";
import BuyBtn from "@/components/shop/BuyBtn";
import Trailer from "@/components/shop/Trailer";

export default async function Sklep() {
  const products = await prisma.video.findMany({
    orderBy: {
      amount: "asc",
    },
  });

  return (
    <main className={styles.main}>
      <section className={styles.title}>
        <Image priority src={underline} alt="tytuł-podkreślenie" />
        <h1>Moje kursy online</h1>
      </section>
      <section className={styles.topWrapper}>
        <Image
          priority
          placeholder="blur"
          className={styles.pati}
          src={pati}
          alt="pati-moje-kursy"
        />
        <div>
          <h3 className={styles.topInfoTitle}>Po co wam te treningi?</h3>
          <p className={styles.topInfo}>
            Trening to nie tylko o wygląd zewnętrzny, ale także o zdrowie i
            samopoczucie. Te treningi wzmacniają ciało i psychikę, redukując
            stres i poprawiając nastrój. Dodatkowo, wybierając treningi online,
            oszczędzacie czas i pieniądze, które musiałbyście zainwestować w
            treningi personalne. To efektywna inwestycja w wasze zdrowie i dobre
            samopoczucie
          </p>
        </div>
      </section>
      {products.map((product, i) => (
        <section
          className={
            i % 2 ? `${styles.wrapper} ${styles.flip}` : styles.wrapper
          }
          id={product.id}
          key={i}
        >
          <Image
            className={styles.thumbnail}
            src={product.image}
            width={500}
            height={500}
            alt="pati-moje-kursy"
          />
          <div className={styles.infoWrapper}>
            <div className={styles.productTitleWrapper}>
              <h3>{product.name}</h3>
              <Image
                className={i % 2 ? styles.line2 : styles.line1}
                src={lineBB2}
                alt={`film ${product.name}`}
              />
            </div>
            <p className={styles.text}>{product.description}</p>
            <ul className={styles.subText}>
              {product.pointsOfInterest.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <div className={styles.controlsWrapper}>
              <Trailer src={product.trailerSrc!} />
              <BuyBtn
                blue
                video
                productId={product.id}
                amount={product.amount}
                priceId={product.stripeId}
              />
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
