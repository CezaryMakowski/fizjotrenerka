import { z } from "zod";

export interface Article {
  id: string;
  image: string;
  title: string;
  content?: string;
  teaser?: string;
  category: string[];
  createdAt?: Date;
  addedImages: string[];
}

export interface Metadata {
  hasNextPage: boolean;
  totalPages: number;
}

export interface ArticlesResults {
  articles: Article[];
  metadata: Metadata;
}

export const addArticleSchema = z.object({
  thumbnail: z.string().min(1, "obrazek jest wymagany"),
  addedImages: z.array(z.string()).optional(),
  authorId: z.string(),
  title: z.string().min(1, "tytuł jest wymagany"),
  zdrowie: z.boolean(),
  fizjoterapia: z.boolean(),
  poledance: z.boolean(),
  uroginekologia: z.boolean(),
  kulturystyka: z.boolean(),
  wyróżnione: z.boolean(),
  content: z.string().min(1, "Treść artykułu jest wymagana"),
  teaser: z.string().min(1, "Zajawka artykułu jest wymagana"),
});

export type TAddArticleSchema = z.infer<typeof addArticleSchema>;

export const editArticleSchema = z.object({
  thumbnail: z.string().min(1, "obrazek jest wymagany"),
  addedImages: z.array(z.string()).optional(),
  title: z.string().min(1, "tytuł jest wymagany"),
  zdrowie: z.boolean(),
  fizjoterapia: z.boolean(),
  poledance: z.boolean(),
  uroginekologia: z.boolean(),
  kulturystyka: z.boolean(),
  wyróżnione: z.boolean(),
  content: z.string().min(1, "Treść artykułu jest wymagana"),
  teaser: z.string().min(1, "Zajawka artykułu jest wymagana"),
});

export type TEditArticleSchema = z.infer<typeof editArticleSchema>;

export const formSchema = z
  .object({
    name: z.string().min(1, "to pole jest wymagane"),
    surename: z.string().min(1, "to pole jest wymagane"),
    email: z.string().min(1, "email jest wymagany"),
    password: z.string().min(7, "hasło za krótkie (min 7 znaków)"),
    confirmPassword: z.string().min(1, "powtórz hsło"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "podane hasła nie są takie same",
    path: ["confirmPassword"],
  });

export type TFormInput = z.infer<typeof formSchema>;

export const passwordResetSchema = z
  .object({
    password: z.string().min(7, "hasło musi mieć przynajmniej 7 znaków"),
    confirmPassword: z.string(),
    token: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "padane hasła nie są takie same",
    path: ["confirmPassword"],
  });

export type TPasswordResetSchema = z.infer<typeof passwordResetSchema>;

export const UserInfoSchema = z
  .object({
    id: z.string(),
    thumbnail: z.string(),
    name: z.string().optional(),
    surename: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    newsletter: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "padane hasła nie są takie same",
    path: ["confirmPassword"],
  });

export type TUserInfoSchema = z.infer<typeof UserInfoSchema>;

export const contactFormSchema = z.object({
  email: z.string().min(1, "podaj maila"),
  name: z.string().min(1, "podaj imię"),
  message: z.string().min(1, "napisz wiadomość"),
});

export type TContactFormSchema = z.infer<typeof contactFormSchema>;
