import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fizjotrenerka.eu";

  // Tutaj dodaj wszystkie statyczne ścieżki swojej strony
  const routes = ["", "/o-mnie", "/oferta", "/cennik", "/kontakt", "/blog"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      priority: route === "" ? 1 : 0.8,
    }),
  );

  return [...routes];
}
