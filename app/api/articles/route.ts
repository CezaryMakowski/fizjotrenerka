import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addArticleSchema, TAddArticleSchema } from "@/lib/types";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/lib/nextAuth";

export async function GET(req: NextRequest) {
  const skip = req.nextUrl.searchParams.get("skip") || "0";
  const take = req.nextUrl.searchParams.get("take") || "6";
  const category = req.nextUrl.searchParams.get("category");
  const searchInput = req.nextUrl.searchParams.get("search");
  const sort = req.nextUrl.searchParams.get("sort");
  const exclude = req.nextUrl.searchParams.get("exclude");

  const results = await prisma.article.findMany({
    take: parseInt(take),
    skip: parseInt(skip),
    orderBy: {
      createdAt: sort !== "asc" && sort !== "desc" ? "desc" : sort,
    },
    where: {
      NOT: { id: exclude ? exclude : undefined },
      category: category ? { has: category } : undefined,
      OR: searchInput
        ? [
            { title: { search: searchInput } },
            { teaser: { search: searchInput } },
          ]
        : undefined,
    },
    select: {
      id: true,
      image: true,
      title: true,
      teaser: true,
      category: true,
      createdAt: true,
      addedImages: true,
    },
  });

  const total = await prisma.article.count({
    where: {
      category: category ? { has: category } : undefined,
      OR: searchInput
        ? [
            { title: { search: searchInput } },
            { teaser: { search: searchInput } },
          ]
        : undefined,
    },
  });

  const articles = {
    articles: results,
    metadata: {
      hasNextPage: parseInt(skip) + parseInt(take) < total,
      totalPages: Math.ceil(total / parseInt(take)),
    },
  };

  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(OPTIONS);
  if (session?.user.role !== "ADMIN") {
    return new NextResponse(null, { status: 401 });
  }

  const data: TAddArticleSchema = await req.json();

  let categories: string[] = [];
  if (data.fizjoterapia) categories.push("fizjoterapia");
  if (data.kulturystyka) categories.push("kulturystyka");
  if (data.poledance) categories.push("poledance");
  if (data.uroginekologia) categories.push("uroginekologia");
  if (data.zdrowie) categories.push("zdrowie");
  if (data.wyróżnione) categories.push("wyróżnione");

  const result = addArticleSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }

  const article = await prisma.article.create({
    data: {
      authorId: result.data.authorId,
      content: result.data.content,
      image: result.data.thumbnail,
      teaser: result.data.teaser,
      title: result.data.title,
      addedImages: result.data.addedImages,
      category: categories,
    },
  });

  return NextResponse.json(article);
}
