import { join } from "path";
import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "../auth/[...nextauth]/routes";

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(OPTIONS);
  if (session?.user.role !== "ADMIN") {
    return new NextResponse(null, { status: 401 });
  }
  const imageRelDir = await request.json();
  const imageDir = join(process.cwd(), "public", imageRelDir);
  try {
    await unlink(imageDir);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true });
}
