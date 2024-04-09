"use client";

import styles from "./PaymentsRow.module.css";
import { motion } from "framer-motion";

export default function PaymentsRow({
  title,
  amount,
  date,
  increment,
}: {
  increment: number;
  title: string;
  amount: number;
  date: Date;
}) {
  const dateToDisplay = date.toLocaleString();
  return (
    <motion.tr
      transition={{ delay: 0.1 * increment, duration: 1, type: "spring" }}
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={styles.content}
    >
      <td className={styles.title}>{title}</td>
      <td>{amount} zł</td>
      <td>{dateToDisplay}</td>
      {/* <td className={styles.invoice}>
        <Image src={invoice} alt="faktura-ikona" />
        <button>pobierz Fakturę</button>
      </td> */}
    </motion.tr>
  );
}
