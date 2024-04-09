import ArticleAddForm from "@/components/blog/ArticleAddForm";
import styles from "./page.module.css";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/routes";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Edit() {
  const session = await getServerSession(OPTIONS);
  if (session?.user.role !== "ADMIN") redirect("/login");
  return (
    <main>
      <h1 className={styles.title}>Nowy artykuł</h1>
      <ArticleAddForm authorId={session.user.id} />
    </main>
  );
}
