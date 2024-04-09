"use client";

import Image from "next/image";
import styles from "./Search.module.css";
import searchIcon from "@/public/Blog/search-icon.svg";
import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type SearchParams = {
  categoryQuery: string;
  sortQuery: string;
  search?: string;
};

export default function Search({
  categoryQuery,
  sortQuery,
  search,
}: SearchParams) {
  const [query, setQuery] = useState(search ? search : "");
  const router = useRouter();

  function searchKeyPressHandler(e: KeyboardEvent) {
    if (e.key === "Enter" && query) {
      router.push(`/blog?search=${query}${categoryQuery + sortQuery}`, {
        scroll: false,
      });
    }
  }

  function searchClickHandler() {
    if (query) {
      router.push(`/blog?search=${query}${categoryQuery + sortQuery}`, {
        scroll: false,
      });
    }
  }

  function eraseClickHandler() {
    setQuery("");
    router.push(`/blog?${categoryQuery + sortQuery}`, { scroll: false });
  }

  return (
    <div className={styles.search}>
      <Image onClick={searchClickHandler} src={searchIcon} alt="ikona-lupa" />
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={searchKeyPressHandler}
        />
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ scale: 0.5, rotate: "60deg", opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: "60deg", opacity: 0 }}
              onClick={eraseClickHandler}
              className={styles.eraseInput}
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
