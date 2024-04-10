import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/lib/nextAuth";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(request: NextRequest) {
  const session = await getServerSession(OPTIONS);
  const needAdmin = request.nextUrl.searchParams.get("admin") || false;

  if (!session) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  if (needAdmin) {
    if (session.user.role !== "ADMIN")
      return NextResponse.json({ success: false }, { status: 401 });
  }

  const formData = await request.formData();

  const file = formData.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "there is no file to upload" }
    );
  }

  const response = await utapi.uploadFiles(file);

  if (response.error) {
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: response.error.message }
    );
  }

  return NextResponse.json({ link: response.data?.url });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(OPTIONS);
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const imageURL = await request.json();
  const imageId = imageURL.slice(18);

  await utapi.deleteFiles(imageId);

  return NextResponse.json({ success: true });
}
