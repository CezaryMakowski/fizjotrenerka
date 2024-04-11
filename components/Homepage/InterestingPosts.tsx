"use client";

import styles from "./InterestingPosts.module.css";
import BlogTile from "../blog/BlogTile";
import Image from "next/image";
import arrow from "@/public/Blog/arrow-blog.svg";
import underline from "@/public/Blog/blog-podkreślenie-tytuł.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Link from "next/link";
import { Article } from "@/lib/types";

export default function InterestingPosts({
  articles,
}: {
  articles: Article[];
}) {
  return (
    <section className={styles.section}>
      <div className={styles.titleWrapper}>
        <Image src={underline} alt="najciekawsze-artykuły-podkreślenie" />
        <h2>Najciekawsze Posty</h2>
      </div>
      <div className={styles.container}>
        <Image id="swiper-back" src={arrow} alt="strzałka-blog" />
        <Swiper
          navigation={{ nextEl: "#swiper-forward", prevEl: "#swiper-back" }}
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
          spaceBetween={10}
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
          {articles?.map((article, index) => {
            return (
              <SwiperSlide key={index}>
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
      <Link href={"/blog"}>
        <button>Zobacz Bloga</button>
      </Link>
    </section>
  );
}
