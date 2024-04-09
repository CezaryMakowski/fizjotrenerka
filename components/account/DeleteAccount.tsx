"use client";

import { signOut } from "next-auth/react";
import styles from "./DeleteAccount.module.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function DeleteAccount() {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  async function deleteHandler() {
    setIsLoading(true);
    const URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
    try {
      const resData = await fetch(`${URL}/api/userupdate`, {
        method: "DELETE",
        body: JSON.stringify(session?.user.id),
      });
      if (session?.user.image !== "/Header/default-profile-pic.svg") {
        const resImg = await fetch(`${URL}/api/uploadImage/deleteuserimg`, {
          method: "DELETE",
          body: JSON.stringify(session?.user.image),
        });

        if (!resImg.ok) {
          throw new Error(resImg.statusText);
        }
      }

      if (!resData.ok) {
        throw new Error(resData.statusText);
      } else {
        signOut();
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <>
      <p onClick={() => setVisible(true)} className={styles.deleteAccount}>
        usuń konto
      </p>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className={styles.deleteMessage}
          >
            <p>czy na pewno chcesz usunąć konto?</p>
            <div>
              <button onClick={deleteHandler} disabled={isLoading}>
                tak
              </button>
              <button onClick={() => setVisible(false)}>nie</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
