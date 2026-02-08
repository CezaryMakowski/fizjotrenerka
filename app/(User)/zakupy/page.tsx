import styles from "./page.module.css";
import Image from "next/image";
import invoice from "@/public/Dashboard/Faktura-ikonka.svg";
import underline from "@/public/Dashboard/konto-użytkownika-podkreślenie.svg";
import EntranceAnimtion from "@/components/account/EntranceAnimation";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/lib/nextAuth";
import { prisma } from "@/lib/prisma";
import PaymentsRow from "@/components/account/PaymentsRow";
import { $Enums } from "@/generated/prisma/wasm";

export const revalidate = 0;

type Order = ({
  products: {
    id: string;
    amount: number;
    name: string;
    stripeId: string;
    image: string;
    description: string;
  }[];
  video: {
    id: string;
    amount: number;
    name: string;
    stripeId: string;
    image: string;
    description: string;
    pointsOfInterest: string[];
    src: string;
    trailerSrc: string | null;
    duration: string;
  } | null;
} & {
  id: string;
  userId: string;
  amount: number;
  status: $Enums.StatusType;
  createdAt: Date;
  videoId: string | null;
})[];

export default async function Zakupy() {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    redirect("/login");
  }

  let orders: Order = [];
  try {
    orders = await prisma.order.findMany({
      where: { userId: session.user.id, status: "COMPLETED" },
      include: { video: true, products: true },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    orders = [];
  }
  let increment = -1;

  return (
    <EntranceAnimtion>
      <main className={styles.main}>
        <div className={styles.tableWrapper}>
          <table style={{ marginTop: "2rem" }}>
            <thead>
              <tr className={styles.headers}>
                <th>Nazwa Kursu</th>
                <th className={styles.pink}>Cena</th>
                <th>Data Zakupu</th>
                <th colSpan={3}>
                  <Image src={underline} alt="podkreślenie-tekstu" />
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, i) => {
                if (order.video) {
                  increment++;
                  return (
                    <PaymentsRow
                      amount={order.amount}
                      date={order.createdAt}
                      title={order.video.name}
                      increment={increment}
                      key={order.id}
                    />
                  );
                } else {
                  return order.products.map((product) => {
                    increment++;
                    return (
                      <PaymentsRow
                        increment={increment}
                        amount={product.amount}
                        date={order.createdAt}
                        title={product.name}
                        key={product.id + i}
                      />
                    );
                  });
                }
              })}
            </tbody>
          </table>
        </div>
      </main>
    </EntranceAnimtion>
  );
}
