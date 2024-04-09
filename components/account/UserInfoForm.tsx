"use client";

import Image from "next/image";
import styles from "./UserInfoForm.module.css";
import underline from "@/public/Dashboard/konto-użytkownika-podkreślenie.svg";
import pinkUnderline from "@/public/Dashboard/konto-użytkownika-podkreślenie-pink.svg";
import pen from "@/public/Dashboard/Konto-użytkownika-pióro.svg";
import { useForm } from "react-hook-form";
import { TUserInfoSchema, UserInfoSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import UserImageUploader from "./UserImageUploader";
import { useSession } from "next-auth/react";

export default function UserInfoForm() {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    reset,
  } = useForm<TUserInfoSchema>({ resolver: zodResolver(UserInfoSchema) });
  const [imageUrl, setImageUrl] = useState(session?.user.image);

  useEffect(() => {
    setValue("thumbnail", imageUrl || "/Header/default-profile-pic.svg");
  }, [imageUrl]);

  useEffect(() => {
    setImageUrl(session?.user.image);
    setValue("newsletter", session?.user.newsletter || false);
    setValue("id", session?.user.id || "");
  }, [session]);

  async function onSubmit(data: TUserInfoSchema) {
    const URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
    try {
      const res = await fetch(`${URL}/api/userupdate`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      const responseData = await res.json();

      if (responseData.error?.email) {
        setError("email", {
          type: "server",
          message: responseData.error.email,
        });
      } else if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        let updateData: any;
        Object.keys(data).forEach((key) => {
          if (key === "newsletter") {
            updateData = { ...updateData, newsletter: data[key] };
            return;
          }
          if (key === "password" || key === "confirmPassword" || key === "id")
            return;
          if (data[key as keyof TUserInfoSchema]) {
            updateData = {
              ...updateData,
              [key]: data[key as keyof TUserInfoSchema],
            };
          }
        });
        update({ ...updateData });
        reset();
      }
    } catch (error) {
      console.error(error);
      setError("name", { type: "server", message: "coś poszło nie tak" });
    }
  }

  return (
    <>
      <UserImageUploader
        imageUrl={imageUrl || "/Header/default-profile-pic.svg"}
        setImageUrl={setImageUrl}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("id")} type="text" hidden />
        <input {...register("thumbnail")} type="text" hidden />
        <div className={styles.infoWrapper}>
          <div className={styles.nameWrapper}>
            <h3>Imię:</h3>
            <input {...register("name")} placeholder={session?.user.name} />
          </div>
          <Image
            className={styles.underline}
            src={underline}
            alt="konto-użytkownika-podkreślenie"
          />
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.nameWrapper}>
            <h3>Nazwisko:</h3>
            <input
              {...register("surename")}
              placeholder={session?.user.surename}
            />
          </div>
          <Image
            className={styles.underline}
            src={pinkUnderline}
            alt="konto-użytkownika-podkreślenie"
          />
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.nameWrapper}>
            <h3>Email:</h3>
            <input
              {...register("email")}
              type="email"
              placeholder={session?.user.email}
            />
          </div>
          <Image
            className={styles.underline}
            src={underline}
            alt="konto-użytkownika-podkreślenie"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.nameWrapper}>
            <h3>Hasło:</h3>
            <input
              {...register("password")}
              type="password"
              placeholder="......."
            />
          </div>
          <Image
            className={styles.underline}
            src={pinkUnderline}
            alt="konto-użytkownika-podkreślenie"
          />
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.nameWrapper}>
            <h3>powtórz hasło:</h3>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="......."
            />
          </div>
          <Image
            className={styles.underline}
            src={underline}
            alt="konto-użytkownika-podkreślenie"
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className={styles.newsletterWrapper}>
          <h3>Powiadomienia</h3>
          <div className={styles.newsletter}>
            <p>
              Zgoda na wysyłanie powiadomień na mail o nowych kursach oraz
              artykułach
            </p>
            <input {...register("newsletter")} type="checkbox" />
          </div>
          <Image src={pinkUnderline} alt="konto-użytkownika-podkreślenie" />
        </div>
        <div style={{ marginTop: "2rem" }} className={styles.changeWrapper}>
          <Image src={pen} alt="konto-użytkownika-pióro" />
          <button disabled={isSubmitting}>Zmień</button>
        </div>
      </form>
    </>
  );
}
