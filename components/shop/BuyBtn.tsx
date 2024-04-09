"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./BuyBtn.module.css";

export default function BuyBtn({
  blue = false,
  amount,
  priceId,
  productId,
  video = false,
}: {
  blue?: boolean;
  amount: number;
  priceId: string;
  productId: string;
  video: boolean;
}) {
  const URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function paymentHandler() {
    setLoading(true);
    try {
      const res = await fetch(`${URL}/api/payment`, {
        method: "POST",
        body: JSON.stringify({ priceId, productId, amount, video }),
      });
      if (res.ok) {
        const link: string = await res.json();
        router.push(link);
      } else if (res.status === 401) {
        const data = await res.json();
        router.push(data.redirect);
        throw new Error(res.statusText);
      } else {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={paymentHandler}
      style={blue ? { backgroundColor: "var(--primary-color)" } : undefined}
      disabled={loading}
      className={styles.btn}
    >
      Kup Kurs {amount}zł
    </button>
  );
}
