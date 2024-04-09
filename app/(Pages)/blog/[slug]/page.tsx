import styles from "./page.module.css";
import Image from "next/image";
import SimilarPosts from "@/components/blog/SimilarPosts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Article } from "@/lib/types";

//pictures
import arrow from "@/public/Blog/arrow-blog.svg";
import underLine from "@/public/Blog/single-post-underline.svg";
import arrowUnderline from "@/public/Blog/single-post-arrow-underline.svg";
import blobLeft from "@/public/Blog/single-post-blob-1.svg";
import blobRight from "@/public/Blog/single-post-blob-2.svg";

type NextPrev = {
  next: { id: string; title: string };
  prev: { id: string; title: string };
};

export const revalidate = 0;

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const siteURL = process.env.NEXTAUTH_URL;
  const data = await fetch(`${siteURL}/api/articles/${params.slug}`);

  const article: Article & NextPrev = await data.json();

  if (!article.id) notFound();

  return (
    <main className={styles.main}>
      <section className={styles.articleImgContainer}>
        <Image
          className={styles.blobLeft}
          src={blobLeft}
          alt="lewy-blob-zdjęcie-artykułu"
        />
        <Image
          className={styles.blobRight}
          src={blobRight}
          alt="prawy-blob-zdjęcie-artykułu"
        />
        <div className={styles.articleImg}>
          <Image
            priority
            src={article.image}
            width={1000}
            height={750}
            alt="single-post-obrazek-artykułu"
          />
        </div>
      </section>
      <section>
        <h1 className={styles.title}>{article.title}</h1>
        <div
          className={styles.articleWrapper}
          dangerouslySetInnerHTML={{ __html: article.content! }}
        ></div>
      </section>
      <section
        className={styles.nextPrevWrapper}
        style={article.prev ? undefined : { justifyContent: "flex-end" }}
      >
        {article.prev && (
          <Link href={"/blog/" + article.prev.id} style={{ width: "50%" }}>
            <div className={styles.prev}>
              <Image src={arrow} alt="strzałka-poprzedni-artykuł" />
              <div>
                <p>{article.prev.title}</p>
                <Image
                  className={styles.underline}
                  src={underLine}
                  alt="podkreślenie-poprzedni-artykuł"
                />
                <Image
                  className={styles.arrowUnderline}
                  src={arrowUnderline}
                  alt="strzałka-podkreślenie"
                />
              </div>
            </div>
          </Link>
        )}
        {article.next && (
          <Link href={"/blog/" + article.next.id} style={{ width: "50%" }}>
            <div className={styles.next}>
              <div>
                <p>{article.next.title}</p>
                <Image
                  className={styles.underline}
                  src={underLine}
                  alt="podkreślenie-poprzedni-artykuł"
                />
                <Image
                  className={styles.arrowUnderline}
                  src={arrowUnderline}
                  alt="strzałka-podkreślenie"
                />
              </div>
              <Image src={arrow} alt="strzałka-poprzedni-artykuł" />
            </div>
          </Link>
        )}
      </section>
      <SimilarPosts categories={article.category} exclude={article.id} />
    </main>
  );
}
