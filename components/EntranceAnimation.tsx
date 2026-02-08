"use client";

import { motion } from "framer-motion";

export default function EntranceAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        type: "spring",
        mass: 0.4,
        stiffness: 150,
      }}
      className="div"
    >
      {children}
    </motion.div>
  );
}
