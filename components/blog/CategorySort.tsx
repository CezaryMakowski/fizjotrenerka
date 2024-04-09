"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CategorySort.module.css";
import ActiveLink from "../ActiveLink";

type CategorySortProps = {
  category?: string;
  sort?: string;
  sortQuery: string;
  searchQuery: string;
  categoryQuery: string;
};

export default function CategorySort({
  category,
  sortQuery,
  searchQuery,
  categoryQuery,
  sort = "desc",
}: CategorySortProps) {
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function windowClickHandler() {
      setCategoryVisible(false);
      setSortVisible(false);
    }

    window.addEventListener("click", windowClickHandler);

    return () => window.removeEventListener("click", windowClickHandler);
  }, []);

  return (
    <>
      <motion.button
        layoutId="category-box"
        onClick={(e) => {
          e.stopPropagation();
          setCategoryVisible(true);
          setSortVisible(false);
        }}
        style={{ borderRadius: "20px" }}
        className={styles.categoryButton}
      >
        <motion.p layoutId="category">Kategorie</motion.p>
      </motion.button>
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          setSortVisible(true);
          setCategoryVisible(false);
        }}
        className={
          !sortVisible
            ? styles.sortSelect
            : `${styles.sortSelect} ${styles.sortVisible}`
        }
      >
        <h3>Sortuj</h3>
        <AnimatePresence>
          {sortVisible && (
            <motion.div
              initial={{ opacity: 0, y: "-50%" }}
              animate={{ opacity: 1, y: "10%" }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <ActiveLink
                scroll={false}
                href={`/blog?sort=desc${categoryQuery + searchQuery}`}
                activeClassName={styles.active}
                comparator="desc"
                queryParam={sort}
              >
                <p>Najnowsze</p>
              </ActiveLink>
              <ActiveLink
                scroll={false}
                href={`/blog?sort=asc${categoryQuery + searchQuery}`}
                activeClassName={styles.active}
                comparator="asc"
                queryParam={sort}
              >
                <p>Najstarsze</p>
              </ActiveLink>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {categoryVisible && (
        <motion.div
          layoutId="category-box"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ borderRadius: "30px" }}
          className={styles.categoryBox}
        >
          <motion.h3 layoutId="category">Kategorie:</motion.h3>
          <ul>
            <ActiveLink
              scroll={false}
              href={`/blog?${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="wszystkie"
              queryParam={category || "wszystkie"}
            >
              <li onClick={scrollToTop}>Wszystkie</li>
            </ActiveLink>
            <ActiveLink
              scroll={false}
              href={`/blog?category=zdrowie${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="zdrowie"
              queryParam={category}
            >
              <li onClick={scrollToTop}>Zdrowie</li>
            </ActiveLink>
            <ActiveLink
              scroll={false}
              href={`/blog?category=fizjoterapia${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="fizjoterapia"
              queryParam={category}
            >
              <li onClick={scrollToTop}>Fizjoterapia</li>
            </ActiveLink>
            <ActiveLink
              scroll={false}
              href={`/blog?category=poledance${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="poledance"
              queryParam={category}
            >
              <li onClick={scrollToTop}>PoleDance</li>
            </ActiveLink>
            <ActiveLink
              scroll={false}
              href={`/blog?category=uroginekologia${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="uroginekologia"
              queryParam={category}
            >
              <li onClick={scrollToTop}>Uroginekologia</li>
            </ActiveLink>
            <ActiveLink
              scroll={false}
              href={`/blog?category=kulturystyka${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="kulturystyka"
              queryParam={category}
            >
              <li onClick={scrollToTop}>Kulturystyka</li>
            </ActiveLink>
          </ul>
        </motion.div>
      )}
    </>
  );
}
