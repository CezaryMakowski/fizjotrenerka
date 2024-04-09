import Image from "next/image";
import styles from "./page.module.css";
import underline from "@/public/Dashboard/konto-użytkownika-podkreślenie.svg";
import pinkUnderline from "@/public/Dashboard/konto-użytkownika-podkreślenie-pink.svg";
import pen from "@/public/Dashboard/Konto-użytkownika-pióro.svg";
import EntranceAnimtion from "@/components/account/EntranceAnimation";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/lib/nextAuth";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Adres() {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    redirect("/login");
  }
  return (
    <EntranceAnimtion>
      <main>
        <div className={styles.infoWrapper}>
          <div className={styles.nameWrapper}>
            <h3>Ulica:</h3>
            <input placeholder="Kadłubka 30A/9" />
          </div>
          <Image
            className={styles.underline}
            src={underline}
            alt="konto-użytkownika-podkreślenie"
          />
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.nameWrapper}>
            <h3>Kod Pocztowy:</h3>
            <input placeholder="71-521" />
          </div>
          <Image
            className={styles.underline}
            src={pinkUnderline}
            alt="konto-użytkownika-podkreślenie"
          />
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.nameWrapper}>
            <h3>Miasto:</h3>
            <input type="email" placeholder="Szczecin" />
          </div>
          <Image
            className={styles.underline}
            src={underline}
            alt="konto-użytkownika-podkreślenie"
          />
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.nameWrapper}>
            <h3>{`NIP (opcjonalne):`}</h3>
            <input type="password" placeholder="85940321" />
          </div>
          <Image
            className={styles.underline}
            src={pinkUnderline}
            alt="konto-użytkownika-podkreślenie"
          />
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.nameWrapper}>
            <h3>{`Nazwa Firmy (opcjonalne):`}</h3>
            <input type="email" placeholder="HempCapone" />
          </div>
          <Image
            className={styles.underline}
            src={underline}
            alt="konto-użytkownika-podkreślenie"
          />
        </div>
        <div style={{ marginTop: "2rem" }} className={styles.changeWrapper}>
          <Image src={pen} alt="konto-użytkownika-pióro" />
          <button>Zmień</button>
        </div>
      </main>
    </EntranceAnimtion>
  );
}
