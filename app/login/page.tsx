import styles from "./page.module.css";
import Image from "next/image";
import LoginForm from "@/components/dashboard/LoginForm";
import curvedLine from "@/public/Login/curved-line.svg";
import Link from "next/link";
import MediaLogin from "@/components/dashboard/MediaLogin";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "../api/auth/[...nextauth]/routes";
import { redirect } from "next/navigation";

export default async function Login({
  searchParams: { isReset, loginFirst },
}: {
  searchParams: { isReset: boolean; loginFirst: boolean };
}) {
  const session = await getServerSession(OPTIONS);
  if (session) redirect("/konto");

  return (
    <main style={{ overflow: "hidden" }}>
      <h1 className={styles.title}>Logowanie</h1>

      {isReset && (
        <p style={{ color: "green" }}>
          udało ci się zresetować hasło. Możesz się teraz zalogować
        </p>
      )}
      {loginFirst && (
        <p style={{ color: "red" }}>
          musisz się najpierw zalogować, aby kupić ten produkt
        </p>
      )}
      <div className={styles.wrapper}>
        <Image
          className={styles.curvedLine}
          src={curvedLine}
          alt="zakrzywiona-linia-fizjotrenerka"
        />
        <LoginForm />
        <Link className={styles.passRecovery} href={"/login/reset-hasla"}>
          Nie pamiętasz hasła?
        </Link>
        <MediaLogin />
        <Link className={styles.register} href={"/rejestracja"}>
          Nie masz konta? Zarejestruj
        </Link>
      </div>
    </main>
  );
}
