import styles from "./Footer.module.css";
import Image from "next/image";
import line from "@/public/Header/różowe-linie-header.svg";
import bloblogo from "@/public/Footer/blob-logo-footer.svg";
import logo from "@/public/Fizjotrenerka-logo.svg";
import facebook from "@/public/facebook-blob-pink.svg";
import instagram from "@/public/instagram-blob.svg";
import pinPoint from "@/public/Footer/footer-pinezka-ikona.svg";
import phone from "@/public/Footer/footer-ikona-telefon.svg";
import mail from "@/public/Footer/footer-email-ikona.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <Image className={styles.left} src={line} alt="różowe-linie" />
      <Image className={styles.right} src={line} alt="różowe-linie" />
      <div className={styles.logoContainer}>
        <Link href={"/"}>
          <div className={styles.wrapperLogo}>
            <Image
              className={styles.blobLogo}
              src={bloblogo}
              alt="blob-footer-logo"
            />
            <Image
              className={styles.logo}
              src={logo}
              alt="fizjotrenerka-logo"
            />
          </div>
        </Link>
        <div className={styles.mediaWrapper}>
          <Link href={"https://www.facebook.com/patipuszkarekpoledancer"}>
            <Image
              className={styles.facebook}
              src={facebook}
              alt="fizjotrenerka-facebook"
            />
          </Link>
          <Link href={"https://www.instagram.com/trenerka.narurce/"}>
            <Image
              className={styles.instagram}
              src={instagram}
              alt="fizjotrenerka-instagram"
            />
          </Link>
        </div>
      </div>

      <div className={styles.contactWrapper}>
        <p>Jeżeli masz jakieś pytania to zapraszam do kontaktu</p>
        <Link href={"/kontakt#contactForm"}>Kontakt</Link>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.infoItem}>
          <Image src={phone} alt="" />
          <a>794 433 994</a>
        </div>
        <div className={styles.infoItem}>
          <Image src={mail} alt="" />
          <a>patrycja.puszkarek1@wp.pl</a>
        </div>
        <div className={styles.infoItem}>
          <Image src={pinPoint} alt="" />
          <a>Krzysztofa Kolumba 5, 70-035 Szczecin</a>
        </div>
      </div>
    </footer>
  );
}
