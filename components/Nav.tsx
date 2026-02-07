"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import line from "@/public/Header/różowe-linie-header.svg";
import NavLinks from "./NavLinks";
import { useEffect, useState } from "react";

export default function Nav() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    function clickHandler() {
      setSidebarVisible(false);
    }

    window.addEventListener("click", clickHandler);

    return () => window.removeEventListener("click", clickHandler);
  }, []);

  return (
    <>
      <header className={styles.wrapper}>
        <Image priority src={line} alt="różowe-linie" />
        <Image priority src={line} alt="różowe-linie" />
        <div className={styles.navList}>
          <div
            className={styles.hamburgerWrapper}
            onClick={(e) => {
              setSidebarVisible(!sidebarVisible);
              e.stopPropagation();
            }}
          >
            <div
              className={`${styles.hamburger} ${
                sidebarVisible ? styles.x : undefined
              }`}
            ></div>
            <div
              className={`${styles.hamburger} ${
                sidebarVisible ? styles.x : undefined
              }`}
            ></div>
            <div
              className={`${styles.hamburger} ${
                sidebarVisible ? styles.x : undefined
              }`}
            ></div>
          </div>
          <NavLinks />
        </div>
      </header>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.sidebarNav} ${
          sidebarVisible ? styles.visible : undefined
        }`}
      >
        <NavLinks setSidebarVisible={setSidebarVisible} />
      </div>
    </>
  );
}
