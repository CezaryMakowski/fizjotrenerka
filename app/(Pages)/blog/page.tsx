import styles from "./page.module.css";
import CategorySort from "@/components/blog/CategorySort";
import Image from "next/image";
import curvedLine from "@/public/Blog/Curved-line-blog.svg";
import Pagination from "@/components/blog/Pagination";
import type { Article, Metadata } from "@/lib/types";
import ActiveLink from "@/components/ActiveLink";
import Search from "@/components/blog/Search";
import QueryNotFound from "@/components/blog/QueryNotFound";
import BlogTile from "@/components/blog/BlogTile";
import Link from "next/link";
import { OPTIONS } from "@/lib/nextAuth";
import { getServerSession } from "next-auth/next";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: "asc" | "desc";
    search?: string;
  }>;
};

export default async function Blog({ searchParams }: PageProps) {
  const params = await searchParams;
  const siteURL = process.env.NEXTAUTH_URL;
  const session = await getServerSession(OPTIONS);
  const isAdmin = session?.user.role === "ADMIN";
  const pageNumber = Number(params?.page) || 1;
  let articles: Article[] = [];
  let metadata: Metadata = { hasNextPage: true, totalPages: 0 };
  const take = 6;
  const skip = (pageNumber - 1) * take;
  const categoryQuery = params.category ? "&category=" + params.category : "";
  const sortQuery = params.sort ? "&sort=" + params.sort : "";
  const searchQuery = params.search ? "&search=" + params.search : "";

  if (pageNumber >= 1) {
    const data = await fetch(
      `${siteURL}/api/articles?take=${take}&skip=${skip}${
        categoryQuery + sortQuery + searchQuery
      }`,
    );
    ({ articles, metadata } = await data.json());
  } else {
    articles = [];
    metadata.hasNextPage = false;
    metadata.totalPages = 0;
  }

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.categoriesWrapper}>
          <h3>Kategorie</h3>
          <ul>
            <ActiveLink
              scroll={false}
              href={`/blog?${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="wszystkie"
              queryParam={params.category || "wszystkie"}
            >
              <li>Wszystkie</li>
            </ActiveLink>
            <ActiveLink
              scroll={false}
              href={`/blog?category=zdrowie${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="zdrowie"
              queryParam={params.category}
            >
              <li>Zdrowie</li>
            </ActiveLink>
            <ActiveLink
              scroll={false}
              href={`/blog?category=fizjoterapia${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="fizjoterapia"
              queryParam={params.category}
            >
              <li>Fizjoterapia</li>
            </ActiveLink>
            <ActiveLink
              scroll={false}
              href={`/blog?category=poledance${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="poledance"
              queryParam={params.category}
            >
              <li>PoleDance</li>
            </ActiveLink>
            <ActiveLink
              scroll={false}
              href={`/blog?category=uroginekologia${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="uroginekologia"
              queryParam={params.category}
            >
              <li>Uroginekologia</li>
            </ActiveLink>
            <ActiveLink
              scroll={false}
              href={`/blog?category=kulturystyka${sortQuery + searchQuery}`}
              activeClassName={styles.active}
              comparator="kulturystyka"
              queryParam={params.category}
            >
              <li>Kulturystyka</li>
            </ActiveLink>
          </ul>
        </div>
        <div className={styles.blogContainer}>
          <div className={styles.title}>
            <Image src={curvedLine} alt="blog-różowa-linia" />
            <Link href={"/blog"}>
              <h1>Blog</h1>
            </Link>
          </div>

          <div className={styles.controlsWrapper}>
            <Search
              categoryQuery={categoryQuery}
              sortQuery={sortQuery}
              search={params.search}
            />
            {isAdmin && (
              <button className={styles.addBtn}>
                <Link href={"/blog/dodaj"}>Dodaj</Link>
              </button>
            )}
            <CategorySort
              sort={params.sort}
              category={params.category}
              searchQuery={searchQuery}
              sortQuery={sortQuery}
              categoryQuery={categoryQuery}
            />
          </div>
          {!articles[0]?.id && <QueryNotFound />}
          <div className={styles.articlesWrapper}>
            {articles.map((article, index) => {
              return (
                <BlogTile
                  isAdmin={isAdmin}
                  id={article.id}
                  image={article.image}
                  teaser={article.teaser!}
                  title={article.title}
                  whichImage={index % 2}
                  addedImages={article.addedImages}
                  key={Math.random()}
                />
              );
            })}
          </div>
          {articles[0]?.id && (
            <Pagination
              page={pageNumber}
              categoryQuery={categoryQuery}
              sortQuery={sortQuery}
              searchQuery={searchQuery}
              {...metadata}
            />
          )}
        </div>
      </section>
    </main>
  );
}
