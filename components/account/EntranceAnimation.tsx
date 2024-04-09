"use client";

import { motion } from "framer-motion";

export default function EntranceAnimtion({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ flexGrow: "1", maxWidth: "100%" }}
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", mass: 0.4, stiffness: 150 }}
    >
      {children}
    </motion.div>
  );
}
