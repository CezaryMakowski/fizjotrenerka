import { NextRequest, NextResponse } from "next/server";
import { OPTIONS } from "@/lib/nextAuth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { TEditArticleSchema, editArticleSchema } from "@/lib/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const article = await prisma.article.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      image: true,
      title: true,
      category: true,
      content: true,
      createdAt: true,
      teaser: true,
    },
  });

  const prev = await prisma.article.findMany({
    skip: 1,
    take: -1,
    cursor: {
      id: params.id,
    },
    select: {
      title: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const next = await prisma.article.findMany({
    skip: 1,
    take: 1,
    cursor: {
      id: params.id,
    },
    select: {
      title: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const results = { ...article, next: next[0], prev: prev[0] };

  return NextResponse.json(results, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(OPTIONS);
  if (session?.user.role !== "ADMIN") {
    return new NextResponse(null, { status: 401 });
  }
  const data: TEditArticleSchema = await req.json();
  let categories: string[] = [];
  if (data.fizjoterapia) categories.push("fizjoterapia");
  if (data.kulturystyka) categories.push("kulturystyka");
  if (data.poledance) categories.push("poledance");
  if (data.uroginekologia) categories.push("uroginekologia");
  if (data.zdrowie) categories.push("zdrowie");
  if (data.wyróżnione) categories.push("wyróżnione");

  const result = editArticleSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }

  const patchedArticle = await prisma.article.update({
    where: { id: params.id },
    data: {
      image: result.data.thumbnail,
      title: result.data.title,
      teaser: result.data.teaser,
      content: result.data.content,
      addedImages: result.data.addedImages,
      category: categories,
    },
  });

  return NextResponse.json(patchedArticle, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(OPTIONS);
  if (session?.user.role !== "ADMIN") {
    return new NextResponse(null, { status: 401 });
  }
  const deleted = await prisma.article.delete({
    where: { id: params.id },
  });
  return NextResponse.json(deleted, { status: 200 });
}
