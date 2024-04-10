import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import UserVerify from "@/components/emails/UserVerify";

const resend = new Resend(process.env.RESEND_SECRET);

export async function GET(
  req: NextRequest,
  { params: { email } }: { params: { email: string } }
) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      activationToken: {
        select: { token: true },
      },
    },
  });

  if (!user)
    return NextResponse.json(
      { success: false },
      { status: 500, statusText: "something went wrong" }
    );
  if (!user.activationToken)
    return NextResponse.json(
      { success: false },
      {
        status: 404,
        statusText: "user has no validation token in the database",
      }
    );

  const { error }: any = await resend.emails.send({
    from: "Fizjotrenerka <onboarding@resend.dev>",
    to: ["cezary.makowski96@gmail.com"],
    subject: "Aktywacja konta",
    react: UserVerify({ name: user.name!, token: user.activationToken.token }),
  });
  if (error)
    return NextResponse.json(
      { success: false },
      { status: error.statusCode, statusText: error.message }
    );

  return NextResponse.json({ success: true });
}
