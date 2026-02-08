import { prisma } from "@/lib/prisma";
import { TPasswordResetSchema, passwordResetSchema } from "@/lib/types";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: TPasswordResetSchema = await req.json();
  const result = passwordResetSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error },
      { status: 403, statusText: result.error.issues[0].message },
    );
  }
  const hashedPassword = await bcrypt.hash(result.data.password, 12);
  if (!result.data.token)
    return NextResponse.json(
      { success: false },
      { status: 403, statusText: "No token submitted" },
    );

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token: result.data.token,
      activatedAt: null,
      createdAt: { gt: new Date(Date.now() - 4 * 40 * 60 * 1000) },
    },
  });

  if (!resetToken) {
    return NextResponse.json(
      { success: false },
      { status: 498, statusText: "token expired or invalid" },
    );
  }

  const userUpdate = prisma.user.update({
    where: {
      id: resetToken.userId,
    },
    data: {
      hashedPassword,
    },
  });

  const tokenUpdate = prisma.passwordResetToken.update({
    where: {
      token: result.data.token,
    },
    data: {
      activatedAt: new Date(),
    },
  });

  try {
    await prisma.$transaction([userUpdate, tokenUpdate]);
  } catch (err: any) {
    return NextResponse.json(
      { success: false },
      {
        status: 500,
        statusText: "something went wrong during database update",
      },
    );
  }

  return NextResponse.json({ success: true });
}
