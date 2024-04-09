import PasswordReset from "@/components/emails/PasswordReset";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_SECRET);

export async function POST(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const user = await prisma.user.findUnique({ where: { email: params.email } });

  if (!user)
    return NextResponse.json(
      { success: false },
      {
        status: 500,
        statusText: "something went wrong when retrieving user from db",
      }
    );

  const token = await prisma.passwordResetToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      userId: user.id,
    },
  });
  if (!token)
    return NextResponse.json(
      { success: false },
      {
        status: 500,
        statusText: "something went wrong during token creation",
      }
    );

  const { error }: any = await resend.emails.send({
    from: "Fizjotrenerka <onboarding@resend.dev>",
    to: ["cezary.makowski96@gmail.com"],
    subject: "Reset hasła",
    react: PasswordReset({ name: user.name!, token: token.token }),
  });
  if (error)
    return NextResponse.json(
      { success: false },
      { status: error.statusCode, statusText: error.message }
    );

  return NextResponse.json({ success: true });
}
