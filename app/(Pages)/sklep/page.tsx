import Image from "next/image";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import underline from "@/public/shop/sklep-podkreślenie.svg";
import pati from "@/public/shop/Pati-sklep.png";
import lineBB2 from "@/public/shop/curvedline-beautybooty-2.svg";
import lineBurner from "@/public/shop/curvedline-fatburner.svg";
import BuyBtn from "@/components/shop/BuyBtn";
import Trailer from "@/components/shop/Trailer";
import programTrailer from "@/videos/Trailer.mp4";

export default async function Sklep() {
  const products = await prisma.video.findMany();

  return (
    <main className={styles.main}>
      <section className={styles.title}>
        <Image priority src={underline} alt="tytuł-podkreślenie" />
        <h1>Moje kursy online</h1>
      </section>
      <section className={styles.topWrapper}>
        <Image
          priority
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
      <section className={styles.wrapper} id="poleCon">
        <Image
          className={styles.thumbnail}
          src={products[0].image}
          width={500}
          height={500}
          alt="pati-moje-kursy"
        />
        <div className={styles.infoWrapper}>
          <div className={styles.productTitleWrapper}>
            <h3>{products[0].name}</h3>
            <Image
              className={styles.line1}
              src={lineBB2}
              alt="linia-beautybooty"
            />
          </div>
          <p className={styles.text}>{products[0].description}</p>
          <ul className={styles.subText}>
            {products[0].pointsOfInterest.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <div className={styles.controlsWrapper}>
            <Trailer src={programTrailer} />
            <BuyBtn
              blue
              video
              productId={products[0].id}
              amount={products[0].amount}
              priceId={products[0].stripeId}
            />
          </div>
        </div>
      </section>
      <section className={styles.wrapper} id="BB">
        <div className={styles.infoWrapper}>
          <div className={styles.productTitleWrapper}>
            <h3>{products[1].name}</h3>
            <Image
              className={styles.line2}
              src={lineBurner}
              alt="linia-beautybooty"
            />
          </div>
          <p className={styles.text}>{products[1].description}</p>
          <ul className={styles.subText}>
            {products[1].pointsOfInterest.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <div className={styles.controlsWrapper}>
            <Trailer src={programTrailer} />
            <BuyBtn
              blue
              video
              productId={products[1].id}
              amount={products[1].amount}
              priceId={products[1].stripeId}
            />
          </div>
        </div>
        <Image
          className={styles.thumbnail}
          src={products[1].image}
          width={500}
          height={500}
          alt="pati-moje-kursy"
        />
      </section>
      <section className={styles.wrapper} id="cardio">
        <Image
          className={styles.thumbnail}
          src={products[2].image}
          width={500}
          height={500}
          alt="pati-moje-kursy"
        />
        <div className={styles.infoWrapper}>
          <div className={styles.productTitleWrapper}>
            <h3>{products[2].name}</h3>
            <Image
              className={styles.line1}
              src={lineBB2}
              alt="linia-beautybooty"
            />
          </div>
          <p className={styles.text}>{products[2].description}</p>
          <ul className={styles.subText}>
            {products[2].pointsOfInterest.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <div className={styles.controlsWrapper}>
            <Trailer src={programTrailer} />
            <BuyBtn
              blue
              video
              productId={products[2].id}
              amount={products[2].amount}
              priceId={products[2].stripeId}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
