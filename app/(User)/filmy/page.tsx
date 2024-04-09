import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Movie from "@/components/account/Movie";

export const revalidate = 0;

export default async function Filmy({
  searchParams: { isBought },
}: {
  searchParams: { isBought: boolean };
}) {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { videos: true },
  });

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        {isBought && (
          <p style={{ color: "red", textAlign: "center" }}>
            ten film jest już w twoim posiadaniu
          </p>
        )}
        {!user?.videos[0] && (
          <div className={styles.noMovies}>
            <p>niestety nie posiadasz jeszcze żadnych filmów</p>
          </div>
        )}
        {user?.videos?.map((video) => (
          <Movie
            duration={video.duration}
            imageSrc={video.image}
            title={video.name}
            key={video.id}
            src={video.src}
          />
        ))}
      </section>
    </main>
  );
}
