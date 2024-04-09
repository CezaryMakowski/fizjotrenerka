import { join } from "path";
import { writeFile } from "fs/promises";
import { readdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "../../auth/[...nextauth]/route";

export async function POST(
  request: NextRequest,
  {
    params: { dir },
  }: { params: { dir: "thumbnails" | "articleImages" | "userImages" } }
) {
  const session = await getServerSession(OPTIONS);

  if (dir !== "articleImages" && dir !== "userImages" && dir !== "thumbnails") {
    return new NextResponse(null, { status: 401 });
  }

  if (dir === "articleImages" || dir === "thumbnails") {
    if (session?.user.role !== "ADMIN")
      return new NextResponse(null, { status: 401 });
  }

  if (dir === "userImages") {
    if (!session) return new NextResponse(null, { status: 401 });
  }

  const formData = await request.formData();

  const file = formData.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json(
      { error: "there is no file to upload" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let filename = file.name.replace(" ", "-");
  let relativeDir = `${dir}/${filename}`;
  let uploadDir = join(process.cwd(), "public", relativeDir);
  const directory = join(process.cwd(), "public", dir);
  const filesInDir = readdirSync(directory);
  const isDuplicateName = filesInDir.includes(filename);

  if (isDuplicateName) {
    filename = "duplicate_" + filename;
    relativeDir = `${dir}/${filename}`;
    uploadDir = join(process.cwd(), "public", relativeDir);
  }

  try {
    await writeFile(uploadDir, buffer);
    return NextResponse.json({ link: `/${relativeDir}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
