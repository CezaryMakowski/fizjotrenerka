import styles from "./page.module.css";
import Image from "next/image";
import invoice from "@/public/Dashboard/Faktura-ikonka.svg";
import underline from "@/public/Dashboard/konto-użytkownika-podkreślenie.svg";
import EntranceAnimtion from "@/components/account/EntranceAnimation";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/routes";
import { prisma } from "@/lib/prisma";
import PaymentsRow from "@/components/account/PaymentsRow";

export const revalidate = 0;

export default async function Zakupy() {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        where: { status: "COMPLETED" },
        include: { video: true, products: true },
      },
    },
  });

  const orders = user?.orders;
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
