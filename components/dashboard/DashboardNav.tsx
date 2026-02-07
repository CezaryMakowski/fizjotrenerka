"use client";

import { motion } from "framer-motion";
import ActiveLink from "../ActiveLink";
import styles from "./DashboardNav.module.css";
import { useEffect, useState } from "react";

export default function DashboardNav() {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    function clickHandler() {
      setNavVisible(false);
    }
    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, []);

  return (
    <>
      <motion.button
        layoutId="nav"
        style={{ borderRadius: "50px", zIndex: "99" }}
        onClick={(e) => {
          e.stopPropagation();
          setNavVisible(true);
        }}
      >
        <motion.h3 layoutId="title" className={styles.title}>
          Nawigacja
        </motion.h3>
      </motion.button>
      {navVisible && (
        <motion.div
          layoutId="nav"
          className={styles.navList}
          style={{ borderRadius: "30px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.h3 layoutId="title" className={styles.title}>
            Nawigacja
          </motion.h3>
          <ul>
            <li onClick={() => setNavVisible(false)}>
              <ActiveLink href="/konto" activeClassName={styles.active}>
                Edytuj Profil
              </ActiveLink>
            </li>
            <li onClick={() => setNavVisible(false)}>
              <ActiveLink href="/zakupy" activeClassName={styles.active}>
                Moje Zakupy
              </ActiveLink>
            </li>
            <li onClick={() => setNavVisible(false)}>
              <ActiveLink href="/filmy" activeClassName={styles.active}>
                Filmy
              </ActiveLink>
            </li>
            <li onClick={() => setNavVisible(false)}>Wyloguj</li>
          </ul>
        </motion.div>
      )}
    </>
  );
}
