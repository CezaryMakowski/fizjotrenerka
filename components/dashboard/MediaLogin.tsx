"use client";

// import facebook from "@/public/Login/facebook-icon.svg";
import google from "@/public/Login/google-icon.svg";
import Image from "next/image";
import styles from "./MediaLogin.module.css";
import { signIn } from "next-auth/react";

export default function MediaLogin() {
  return (
    <>
      <div
        onClick={() => signIn("google", { callbackUrl: "/konto" })}
        className={styles.mediaWrapper}
      >
        <Image src={google} alt="ikona-google" />
        <p>Zaloguj/zarejestruj za pomocą Google</p>
      </div>
      {/* <div className={styles.mediaWrapper}>
        <Image src={facebook} alt="ikona-facebook" />
        <p>Zaloguj/zarejestruj za pomocą Facebooka</p>
      </div> */}
    </>
  );
}
