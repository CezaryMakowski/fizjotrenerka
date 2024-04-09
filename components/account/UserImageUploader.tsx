"use client";

import { ChangeEvent, useEffect, useState } from "react";
import styles from "./UserImageUploader.module.css";
import Image from "next/image";
import pinkPen from "@/public/Dashboard/Konto-użytkownika-pióro-pink.svg";
import deleteIcon from "@/public/Blog/delete.svg";

export default function UserImageUploader({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}) {
  const [isGoogle, setIsGoogle] = useState(false);
  const [error, setError] = useState("");
  const isLoaded = imageUrl !== "/Header/default-profile-pic.svg";

  useEffect(() => {
    setIsGoogle(imageUrl.includes("https://lh3.googleusercontent.com/"));
  }, [imageUrl]);

  async function uploadHandler({ target }: ChangeEvent<HTMLInputElement>) {
    setError("");
    if (!target.files) {
      console.warn("no file was chosen");
      return;
    }
    if (target.files[0].size > 2500000) {
      setError("obrazek ma za duży rozmiar");
      return;
    }

    const formData = new FormData();
    formData.append("file", target.files[0]);

    try {
      const res = await fetch("/api/uploadImage/userImages", {
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
    setError("");
    const jsonURL = JSON.stringify(imageUrl);
    try {
      const res = await fetch("/api/uploadImage/deleteuserimg", {
        method: "DELETE",
        body: jsonURL,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }
      setImageUrl("/Header/default-profile-pic.svg");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isLoaded && !isGoogle && (
        <Image
          className={styles.delete}
          onClick={deleteHandler}
          src={deleteIcon}
          alt="usuwanie wybranego thumbnail artykułu"
        />
      )}
      <label
        className={styles.label}
        style={isLoaded ? { cursor: "default" } : { cursor: "pointer" }}
      >
        <input
          hidden
          type="file"
          onChange={uploadHandler}
          disabled={isLoaded}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Image
          style={isGoogle ? { marginBottom: "2rem" } : undefined}
          className={styles.profilePic}
          src={imageUrl}
          height={400}
          width={400}
          alt="zdjęcie-profilowe"
        />
        {!isGoogle && (
          <div className={styles.changeWrapper}>
            <Image src={pinkPen} alt="różowe-pióro-edycja-profilu" />
            <h3 className={styles.editPicture}>Edytuj Zdjęcie Profilowe</h3>
          </div>
        )}
      </label>
    </>
  );
}
