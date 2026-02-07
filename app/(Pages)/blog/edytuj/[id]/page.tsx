import styles from "./page.module.css";
import { Article } from "@/lib/types";
import { notFound } from "next/navigation";
import { OPTIONS } from "@/lib/nextAuth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import ArticleEditForm from "@/components/blog/ArticleEditForm";

const siteURL = process.env.NEXTAUTH_URL;

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(OPTIONS);
  if (session?.user.role !== "ADMIN") redirect("/login");
  let data;
  try {
    data = await fetch(`${siteURL}/api/articles/${(await params).id}`);
  } catch (error) {
    console.error(error);
    notFound();
  }
  const article: Article = await data.json();

  if (!article.id) notFound();

  return (
    <main>
      <h1 className={styles.title}>Edytuj artykuł</h1>
      <ArticleEditForm
        id={article.id}
        image={article.image}
        title={article.title}
        content={article.content}
        teaser={article.teaser}
        addedImages={article.addedImages}
        category={article.category}
      />
    </main>
  );
}
