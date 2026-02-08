import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://fizjotrenerka.eu";

  const staticRoutes = [
    "",
    "/o-mnie",
    "/sklep",
    "/cennik",
    "/kontakt",
    "/blog",
    "/grafik",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    priority: route === "" ? 1 : 0.8,
  }));

  // Fetch all articles for dynamic routes
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      createdAt: true,
    },
  });

  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.id}`,
    lastModified: new Date(article.createdAt).toISOString().split("T")[0],
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
