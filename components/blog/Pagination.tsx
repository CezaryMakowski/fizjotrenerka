"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Pagination.module.css";
import arrow from "@/public/Blog/strzałka-pagination.svg";

type PaginationProps = {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  categoryQuery: string;
  sortQuery: string;
  searchQuery: string;
};

export default function Pagination({
  page,
  totalPages,
  hasNextPage,
  categoryQuery,
  sortQuery,
  searchQuery,
}: PaginationProps) {
  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);
  const getPagesToShow = () => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const pages = getPagesToShow();

  return (
    <div className={styles.pagination}>
      <Link
        onClick={scrollToTop}
        scroll={false}
        href={`?page=${currentPage - 1}${
          categoryQuery + sortQuery + searchQuery
        }`}
      >
        <div
          className={
            currentPage === 1
              ? `${styles.disabled} ${styles.arrow}`
              : styles.arrow
          }
        >
          <Image src={arrow} alt="strzałka pagination" />
        </div>
      </Link>

      <nav aria-label="Pagination">
        {pages.map((p, i) => (
          <Link
            onClick={scrollToTop}
            scroll={false}
            key={i}
            href={`?page=${p}${categoryQuery + sortQuery + searchQuery}`}
          >
            <div className={currentPage === p ? styles.active : ""} key={i}>
              {p}
            </div>
          </Link>
        ))}
      </nav>

      <Link
        onClick={scrollToTop}
        scroll={false}
        href={`?page=${currentPage + 1}${
          categoryQuery + sortQuery + searchQuery
        }`}
      >
        <div
          className={
            !hasNextPage ? `${styles.disabled} ${styles.arrow}` : styles.arrow
          }
        >
          <Image
            className={styles.right}
            src={arrow}
            alt="strzałka pagination"
          />
        </div>
      </Link>
    </div>
  );
}
