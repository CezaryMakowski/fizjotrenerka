"use client";

import styles from "./BlogTile.module.css";
import Image from "next/image";
import blob1 from "@/public/Blog/kafelki-blog-blob-1.svg";
import blob2 from "@/public/Blog/kafelki-blog-blob-2.svg";
import mask1 from "@/public/Blog/blog-kafelki-clip-mask-1.svg";
import mask2 from "@/public/Blog/blog-kafelki-clip-mask-2.svg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import deletePost from "@/public/Blog/delete.svg";
import edit from "@/public/Blog/edit.svg";
import { useRouter } from "next/navigation";

type Random = {
  mask: { src: string };
  blob: string;
  blobConfiguration: string;
};
type blogTileType = {
  id: string;
  image: string;
  teaser: string;
  title: string;
  whichImage: number;
  isAdmin?: boolean;
  addedImages?: string[];
};

export default function BlogTile({
  id,
  image,
  teaser,
  title,
  whichImage,
  isAdmin = false,
  addedImages,
}: blogTileType) {
  const [random, setRandom] = useState<Random>();
  const [deleteWindowVisible, setDeleteWindowVisible] = useState(false);
  const router = useRouter();
  const siteURL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

  useEffect(() => {
    const masks = [mask1, mask2];
    const blobs = [blob1, blob2];
    const blobConfigurations = [
      "scale(1, -1)",
      "scale(-1)",
      "scale(-1, -1)",
      "scale(1)",
    ];
    const randomNumber = Math.floor(Math.random() * 4);
    setRandom({
      mask: masks[whichImage],
      blob: blobs[whichImage],
      blobConfiguration: blobConfigurations[randomNumber],
    });
  }, []);

  async function deletePostHandler() {
    setDeleteWindowVisible(false);
    try {
      const imageURL = JSON.stringify(image);
      const res = await fetch("/api/uploadImage", {
        method: "DELETE",
        body: imageURL,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }

    addedImages?.forEach(async (image: string) => {
      const imageURL = JSON.stringify(image);
      try {
        const res = await fetch("/api/uploadImage", {
          method: "DELETE",
          body: imageURL,
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    });
    try {
      const res = await fetch(`${siteURL}/api/articles/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.error(err);
    }
    router.refresh();
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        {isAdmin && (
          <>
            <Link href={`/blog/edytuj/${id}`}>
              <Image className={styles.edit} src={edit} alt="edytycja-postu" />
            </Link>
            <Image
              className={styles.delete}
              onClick={() => setDeleteWindowVisible(true)}
              src={deletePost}
              alt="usuwanie-postu"
            />
          </>
        )}
        <Link className={styles.link} href={`/blog/${id}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className={styles.wrapper}
          >
            {random?.mask && (
              <Image
                style={{
                  WebkitMaskImage: `url(${random.mask.src})`,
                  maskImage: `url(${random.mask.src})`,
                }}
                className={styles.thumb}
                placeholder="blur"
                blurDataURL="/Blog/placeholder.svg"
                src={image}
                width={400}
                height={400}
                alt="thumbnail-blog"
              />
            )}
            <h3>{title}</h3>
            <div>
              {random?.blob && (
                <Image
                  style={{ transform: random.blobConfiguration }}
                  src={random.blob}
                  alt="kafelek-blog-blob"
                />
              )}
              <p>{teaser}</p>
            </div>
          </motion.div>
        </Link>
      </div>
      <AnimatePresence>
        {deleteWindowVisible && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className={styles.deleteWindow}
          >
            <p>Na pewno chcesz usunąć ten artykuł?</p>
            <div>
              <button onClick={deletePostHandler}>Tak</button>
              <button onClick={() => setDeleteWindowVisible(false)}>Nie</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
