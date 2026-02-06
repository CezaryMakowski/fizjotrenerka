import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/login",
        "/rejestracja",
        "/api",
        "/adres",
        "/filmy",
        "/konto",
        "/zakupy",
        "/not-found",
      ],
    },
    sitemap: "https://fizjotrenerka.eu/sitemap.xml",
  };
}
