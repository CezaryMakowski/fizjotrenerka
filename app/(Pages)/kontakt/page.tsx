//css
import styles from "./page.module.css";
//components
import Image from "next/image";
import Map from "@/components/contact/map";
import ContactForm from "@/components/contact/ContactForm";
//pictures
import googleBlob1 from "@/public/contact/kontakt-blob-1.svg";
import googleBlob2 from "@/public/contact/kontakt-blob-2.svg";
import googleCurvedLine from "@/public/contact/curved-line-google.svg";
import curvedLineTitle from "@/public/contact/curved-line-tytuł.svg";
import phoneBlob from "@/public/contact/kontakt-telefon-blob.svg";
import mailBlob from "@/public/contact/kontakt-mail-blob.svg";
import instaBlob from "@/public/contact/kontakt-instagram-blob.svg";
import pati from "@/public/contact/kontakt-pati-fizjotrenerka.png";
import curvedLineForm from "@/public/contact/formularz-curved-line.svg";

export default function Kontakt() {
  return (
    <main style={{ paddingBottom: "6rem", overflow: "hidden" }}>
      <div className={styles.title}>
        <h1>Zapraszam do Kontaktu</h1>
        <Image src={curvedLineTitle} alt="podkreślenie-tutył" />
      </div>
      <div className={styles.googleWrapper}>
        <Image
          className={styles.googleBlob1}
          src={googleBlob1}
          alt="goolge-blob"
        />
        <Image
          className={styles.googleBlob2}
          src={googleBlob2}
          alt="google-blob"
        />
        <div className={styles.googleMap}>
          <Map googleKey={process.env.GOOGLE_API_KEY as string} />
        </div>
        <Image
          className={styles.googleCurvedLine}
          src={googleCurvedLine}
          alt="linia-google"
        />
      </div>
      <p className={styles.address}>Krzysztofa Kolumba 5, 70-035 Szczecin</p>
      <div className={styles.contactWrapper}>
        <div className={styles.contactInfo}>
          <Image src={phoneBlob} alt="kontakt-telefon-blob" />
          <h3>{"+(48) 794 433 994"}</h3>
        </div>
        <div className={styles.contactInfo}>
          <Image src={mailBlob} alt="kontakt-mail-blob" />
          <h3>patrycja.puszkarek1@wp.pl</h3>
        </div>
        <div className={styles.contactInfo}>
          <Image src={instaBlob} alt="kontakt-instagram-blob" />
          <h3>@trenerka.narurce</h3>
        </div>
      </div>
      <div id="contactForm"></div>
      <div className={styles.formContainer}>
        <Image
          className={styles.curvedLineForm}
          src={curvedLineForm}
          alt="kontakt-curved-line-formularz"
        />
        <Image
          className={styles.pati}
          src={pati}
          alt="kontakt-pati-fizjotrenerka"
        />
        <div>
          <h2>Kontakt</h2>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
