"use client";

import styles from "./SimilarPosts.module.css";
import BlogTile from "../blog/BlogTile";
import Image from "next/image";
import arrow from "@/public/Blog/arrow-blog.svg";
import underline from "@/public/Blog/blog-podkreślenie-tytuł.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useLayoutEffect, useState } from "react";
import { Article } from "@/lib/types";

export default function InterestingPosts({
  categories,
  exclude,
}: {
  categories: string[];
  exclude: string;
}) {
  const [data, setData] = useState<Article[]>([]);
  const siteURL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

  async function getArticles() {
    let results: Article[] = [];
    for (const category of categories) {
      if (category === "wyróżnione") continue;
      const fetchData = await fetch(
        `${siteURL}/api/articles?take=6&skip=0&category=${category}&exclude=${exclude}`
      );
      const { articles }: { articles: Article[] } = await fetchData.json();
      results = [...articles, ...results];
    }

    const ids = results.map(({ id }) => id);
    const filtered = results.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );

    setData([...filtered]);
  }

  useLayoutEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {data[0] && (
        <section className={styles.section}>
          <div className={styles.titleWrapper}>
            <Image src={underline} alt="najciekawsze-artykuły-podkreślenie" />
            <h2>Podobne Posty</h2>
          </div>
          {data.length <= 3 && (
            <div className={styles.containerNoSlider}>
              {data?.map((article, index) => {
                return (
                  <BlogTile
                    id={article.id}
                    image={article.image}
                    teaser={article.teaser!}
                    title={article.title}
                    whichImage={index % 2}
                    key={index}
                  />
                );
              })}
            </div>
          )}
          {data.length > 3 && (
            <div className={styles.container}>
              <Image id="swiper-back" src={arrow} alt="strzałka-blog" />
              <Swiper
                navigation={{
                  nextEl: "#swiper-forward",
                  prevEl: "#swiper-back",
                }}
                loop={true}
                slidesPerView={1}
                breakpoints={{
                  1080: {
                    slidesPerView: 3,
                  },
                  810: {
                    slidesPerView: 2,
                  },
                }}
                spaceBetween={20}
                effect={"coverflow"}
                modules={[EffectCoverflow, Navigation]}
                coverflowEffect={{
                  scale: 0.8,
                  rotate: 0,
                  stretch: 1,
                  depth: 0,
                  modifier: 1,
                  slideShadows: false,
                }}
              >
                {data?.map((article, index) => {
                  return (
                    <SwiperSlide className={styles.swiperSlide} key={index}>
                      <BlogTile
                        id={article.id}
                        image={article.image}
                        teaser={article.teaser!}
                        title={article.title}
                        whichImage={index % 2}
                        key={index}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Image
                id="swiper-forward"
                className={styles.rightArrow}
                src={arrow}
                alt="strzałka-blog"
              />
              <div>
                <Image id="swiper-back" src={arrow} alt="strzałka-blog" />
                <Image
                  id="swiper-forward"
                  className={styles.rightArrow}
                  src={arrow}
                  alt="strzałka-blog"
                />
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
