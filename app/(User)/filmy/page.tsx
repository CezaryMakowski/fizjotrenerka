import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Movie from "@/components/account/Movie";

export const revalidate = 0;

type Video = {
  id: string;
  name: string;
  image: string;
  src: string;
  duration: string;
};

export default async function Filmy({
  searchParams,
}: {
  searchParams: Promise<{ isBought: boolean }>;
}) {
  const { isBought } = await searchParams;
  const session = await getServerSession(OPTIONS);
  if (!session) {
    redirect("/login");
  }
  let videos: Video[] = [];
  try {
    videos = await prisma.video.findMany({
      where: { users: { some: { id: session.user.id } } },
      select: {
        id: true,
        name: true,
        image: true,
        duration: true,
        src: true,
      },
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    videos = [];
  }

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        {isBought && (
          <p style={{ color: "red", textAlign: "center" }}>
            ten film jest już w twoim posiadaniu
          </p>
        )}
        {!videos[0] && (
          <div className={styles.noMovies}>
            <p>niestety nie posiadasz jeszcze żadnych filmów</p>
          </div>
        )}
        {videos.map((video) => (
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
