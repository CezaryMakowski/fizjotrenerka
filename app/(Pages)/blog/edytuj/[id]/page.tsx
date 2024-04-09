import styles from "./page.module.css";
import { Article } from "@/lib/types";
import { notFound } from "next/navigation";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import ArticleEditForm from "@/components/blog/ArticleEditForm";

export default async function Edit({ params }: { params: { id: string } }) {
  const session = await getServerSession(OPTIONS);
  if (session?.user.role !== "ADMIN") redirect("/login");
  const data = await fetch(`http://localhost:3000/api/articles/${params.id}`);
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
