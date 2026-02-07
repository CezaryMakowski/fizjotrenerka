import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ token: string }>;
  },
) {
  const { token } = await params;

  const user = await prisma.user.findFirst({
    where: {
      activationToken: {
        AND: [
          {
            activatedAt: null,
          },
          {
            token,
          },
        ],
      },
    },
  });

  if (!user) {
    throw new Error("Token is invalid");
  }

  const userUpdate = prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
    },
  });

  const tokenUpdate = prisma.verificationToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  });

  try {
    await prisma.$transaction([userUpdate, tokenUpdate]);
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }

  redirect("/login");
}
