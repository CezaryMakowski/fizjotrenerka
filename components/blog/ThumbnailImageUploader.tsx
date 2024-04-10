"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from "./ThumbnailImageUploader.module.css";
import deleteIcon from "@/public/Blog/delete.svg";

export default function ThumbnailImageUploader({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}) {
  const isLoaded = imageUrl !== "/Blog/placeholder.svg";

  async function uploadHandler({ target }: ChangeEvent<HTMLInputElement>) {
    if (!target.files) {
      console.warn("no file was chosen");
      return;
    }

    const formData = new FormData();
    formData.append("file", target.files[0]);

    try {
      const res = await fetch("/api/uploadImage?admin=true", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data: { link: string } = await res.json();

      setImageUrl(data.link);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteHandler() {
    const jsonURL = JSON.stringify(imageUrl);
    try {
      const res = await fetch("/api/uploadImage", {
        method: "DELETE",
        body: jsonURL,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }
      setImageUrl("/Blog/placeholder.svg");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isLoaded && (
        <Image
          className={styles.deleteThumb}
          onClick={deleteHandler}
          src={deleteIcon}
          alt="usuwanie wybranego thumbnail artykułu"
        />
      )}
      <label
        className={styles.uploadWrapper}
        style={isLoaded ? { cursor: "default" } : { cursor: "pointer" }}
      >
        <Image
          src={imageUrl}
          alt="przesłany obrazek artykułu"
          width={1280}
          height={880}
          priority
        />
        <span>Dodaj obrazek artykułu</span>
        <input
          hidden
          type="file"
          onChange={uploadHandler}
          disabled={isLoaded}
        />
      </label>
    </>
  );
}
