"use client";

import Image from "next/image";
import styles from "./TopContent.module.css";
import logo from "@/public/Fizjotrenerka-logo.svg";
import facebook from "@/public/facebook-blob.svg";
import instagram from "@/public/instagram-blob.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function TopContent() {
  const [isVisible, setIsVisible] = useState(false);
  const session = useSession();

  const user = session.data?.user;

  useEffect(() => {
    function clickHandler() {
      setIsVisible(false);
    }
    window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <>
      <div className={styles.logoWrapper}>
        <Link href={"/"}>
          <Image className={styles.logo} src={logo} alt="Fizjotrenerka-logo" />
        </Link>
        <div className={styles.mediaWrapper}>
          <Link href={"https://www.facebook.com/patipuszkarekpoledancer"}>
            <Image
              className={styles.facebook}
              src={facebook}
              alt="logo-facebook"
            />
          </Link>
          <Link href={"https://www.instagram.com/trenerka.narurce/"}>
            <Image
              className={styles.instagram}
              src={instagram}
              alt="logo-instagram"
            />
          </Link>
        </div>
      </div>
      {!user && (
        <Link className={styles.profileWrapper} href={"/login"}>
          <button className={styles.signIn}>Zaloguj</button>
        </Link>
      )}
      {user && (
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={styles.profileWrapper}
        >
          <div className={styles.imageWrapper}>
            <Image
              className={styles.profileImage}
              src={user.image}
              alt="Zdjęcie profilowe"
              width={560}
              height={560}
            />
          </div>
          <div className={styles.profileInfo}>
            <motion.div
              layoutId="container"
              style={{ borderRadius: "15px" }}
              className={styles.profileBtn}
            >
              <motion.p
                layoutId="my-account"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(true);
                }}
              >
                Moje Konto
              </motion.p>
            </motion.div>
            {isVisible && (
              <motion.div
                layoutId="container"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                style={{ borderRadius: "15px" }}
                className={styles.profileDropdown}
              >
                <motion.ul layout>
                  <Link href="/konto">
                    <motion.li layoutId="my-account">Moje konto</motion.li>
                  </Link>
                  <Link href="/filmy">
                    <li>Filmy</li>
                  </Link>
                  <Link href="/zakupy">
                    <li>Moje zakupy</li>
                  </Link>
                  <li onClick={() => signOut()}>Wyloguj</li>
                </motion.ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
