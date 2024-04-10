import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/lib/nextAuth";
import { prisma } from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { image: "/Header/default-profile-pic.svg" },
  });

  if (!user) {
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "something went wrong during user update" }
    );
  }

  const imageURL = await request.json();
  const imageId = imageURL.slice(18);

  await utapi.deleteFiles(imageId);

  return NextResponse.json({ success: true });
}
