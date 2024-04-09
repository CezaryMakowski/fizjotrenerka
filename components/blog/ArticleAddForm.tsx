"use client";

import ThumbnailImageUploader from "./ThumbnailImageUploader";
import styles from "./ArticleAddForm.module.css";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/plugins/table.min.css";
import { useEffect, useRef, useState } from "react";
import { addArticleSchema, TAddArticleSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

const FroalaEditor = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg"),
      import("froala-editor/js/plugins/image.min.js" as any),
      import("froala-editor/js/plugins/table.min.js" as any),
      import("froala-editor/js/plugins/link.min.js" as any),
      import("froala-editor/js/plugins/lists.min.js" as any),
      import("froala-editor/js/plugins/paragraph_format.min.js" as any),
    ]);
    return values[0];
  },
  {
    ssr: false,
  }
);

export default function ArticleAddForm({ authorId }: { authorId: string }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    watch,
    setValue,
  } = useForm<TAddArticleSchema>({ resolver: zodResolver(addArticleSchema) });
  const [formData, setFormData] = useState<TAddArticleSchema>(() => {
    let localData;
    if (typeof window !== "undefined") {
      localData = localStorage.getItem("formValues");
    }
    if (localData) {
      const formValues: TAddArticleSchema = JSON.parse(localData);
      return formValues;
    } else
      return {
        thumbnail: "",
        addedImages: [],
        authorId: authorId,
        title: "",
        zdrowie: false,
        fizjoterapia: false,
        poledance: false,
        uroginekologia: false,
        kulturystyka: false,
        wyróżnione: false,
        content: "",
        teaser: "",
      };
  });

  const [imageUrl, setImageUrl] = useState("/Blog/placeholder.svg");
  const formImages = useRef<string[]>([]);
  if (formData.addedImages) formImages.current = formData.addedImages;

  const config = {
    placeholderText: "Napisz treść artykułu",
    listAdvancedTypes: true,
    height: "15rem",
    width: "90%",
    imageUploadURL: "/api/uploadImage/articleImages",
    imageUploadMethod: "POST",
    imageMaxSize: 2 * 1024 * 1024,
    tableDefaultWidth: "fit-content",
    paragraphFormat: {
      H3: "nagłówek",
      N: "tekst",
    },
    events: {
      "image.beforeRemove": async function (img: HTMLImageElement[]) {
        const URL = img[0].getAttribute("src") as string;
        const jsonURL = JSON.stringify(URL);
        let currentImages: string[];
        if (formImages.current.length > 1) {
          const index = formImages.current.indexOf(URL);
          currentImages = [...formImages.current];
          currentImages.splice(index, 1);
        } else {
          currentImages = [];
        }
        setFormData((prev) => {
          return { ...prev, addedImages: currentImages };
        });
        try {
          const res = await fetch("/api/uploadImage", {
            method: "DELETE",
            body: jsonURL,
          });

          if (!res.ok) {
            throw new Error(res.statusText);
          }
        } catch (error) {
          console.error(error);
        }
      },
      "image.uploaded": async function (res: string) {
        const { link } = await JSON.parse(res);
        const currentImages = [...formImages.current, link];
        setFormData((prev) => {
          return { ...prev, addedImages: currentImages };
        });
      },
      "image.error": function (err: unknown) {
        console.error(err);
      },
    },
  };

  useEffect(() => {
    if (imageUrl !== "/Blog/placeholder.svg") {
      setValue("thumbnail", imageUrl);
      setFormData((data) => {
        return { ...data, thumbnail: imageUrl };
      });
    } else {
      setValue("thumbnail", "");
      setFormData((data) => {
        return { ...data, thumbnail: "" };
      });
    }
  }, [imageUrl]);

  useEffect(() => {
    reset({
      title: formData.title,
      fizjoterapia: formData.fizjoterapia,
      kulturystyka: formData.kulturystyka,
      uroginekologia: formData.uroginekologia,
      wyróżnione: formData.wyróżnione,
      zdrowie: formData.zdrowie,
      poledance: formData.poledance,
      teaser: formData.teaser,
    });
    setValue("authorId", authorId);
    if (formData.thumbnail) setImageUrl(formData.thumbnail);
  }, []);

  useEffect(() => {
    setValue("content", formData.content);
    setValue("addedImages", formData.addedImages);
    const intervalId = setInterval(() => {
      const data = watch();
      setFormData(data);
      localStorage.setItem("formValues", JSON.stringify(formData) || "{}");
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [formData]);

  async function onSubmit(data: TAddArticleSchema) {
    let URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
    try {
      const res = await fetch(`${URL}/api/articles`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      if (res.ok) {
        setImageUrl("/Blog/placeholder.svg");
        reset({
          thumbnail: "",
          addedImages: [],
          authorId: authorId,
          title: "",
          zdrowie: false,
          fizjoterapia: false,
          poledance: false,
          uroginekologia: false,
          kulturystyka: false,
          wyróżnione: false,
          content: "",
          teaser: "",
        });
        setFormData({
          thumbnail: "",
          addedImages: [],
          authorId: authorId,
          title: "",
          zdrowie: false,
          fizjoterapia: false,
          poledance: false,
          uroginekologia: false,
          kulturystyka: false,
          wyróżnione: false,
          content: "",
          teaser: "",
        });
        localStorage.setItem("formValues", "{}");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className={styles.section}>
      {errors.thumbnail && (
        <p style={{ color: "red", margin: "auto", width: "fit-content" }}>
          {errors.thumbnail.message}
        </p>
      )}
      <ThumbnailImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input {...register("thumbnail")} hidden type="text" />
        <input {...register("authorId")} hidden type="text" />
        <input {...register("addedImages")} hidden type="text" />
        <h3>Tytuł:</h3>
        <input
          {...register("title")}
          className={styles.articleTitle}
          id="title"
          type="text"
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
        <h3>Kategorie:</h3>
        <div className={styles.categoryWrapper}>
          <label htmlFor="zdrowie">zdrowie</label>
          <input {...register("zdrowie")} type="checkbox" id="zdrowie" />
          <label htmlFor="fizjoterapia">fizjoterapia</label>
          <input
            {...register("fizjoterapia")}
            type="checkbox"
            id="fizjoterapia"
          />
          <label htmlFor="poledance">poledance</label>
          <input {...register("poledance")} type="checkbox" id="poledance" />
          <label htmlFor="uroginekologia">uroginekologia</label>
          <input
            {...register("uroginekologia")}
            type="checkbox"
            id="uroginekologia"
          />
          <label htmlFor="kulturystyka">kulturystyka</label>
          <input
            {...register("kulturystyka")}
            type="checkbox"
            id="kulturystyka"
          />
          <label htmlFor="wyróżnione">wyróżnione</label>
          <input {...register("wyróżnione")} type="checkbox" id="wyróżnione" />
        </div>
        <h3>Treść:</h3>
        <FroalaEditor
          model={formData.content}
          onModelChange={(e: string) => {
            setFormData((data) => {
              return { ...data, content: e };
            });
          }}
          tag="textarea"
          config={config}
        />
        {errors.content && (
          <p style={{ color: "red" }}>{errors.content.message}</p>
        )}
        <input {...register("content")} hidden />
        <h3>Zajawka:</h3>
        <textarea {...register("teaser")} className={styles.teaser} />
        {errors.teaser && (
          <p style={{ color: "red" }}>{errors.teaser.message}</p>
        )}
        <button className={styles.submit} disabled={isSubmitting} type="submit">
          Dodaj Artykuł
        </button>
      </form>
    </section>
  );
}
