import styles from "./page.module.css";
import Image from "next/image";
import RegistrationForm from "@/components/dashboard/RegistrationForm";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "../api/auth/[...nextauth]/routes";
import { redirect } from "next/navigation";
import curvedLine from "@/public/Login/curved-line.svg";

export default async function Login() {
  const session = await getServerSession(OPTIONS);
  if (session) redirect("/konto");

  return (
    <main style={{ overflow: "hidden" }}>
      <h1 className={styles.title}>Rejestracja</h1>
      <div className={styles.wrapper}>
        <Image
          className={styles.curvedLine}
          src={curvedLine}
          alt="zakrzywiona-linia-fizjotrenerka"
        />
        <RegistrationForm />
      </div>
    </main>
  );
}
