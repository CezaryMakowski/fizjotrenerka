import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { TFormInput, formSchema } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { Resend } from "resend";
import UserVerify from "@/components/emails/UserVerify";
import { randomUUID } from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});
const resend = new Resend(process.env.RESEND_SECRET);

export async function POST(req: NextRequest) {
  const data: TFormInput = await req.json();

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }

  const password = await bcrypt.hash(data.password, 12);
  const email = data.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser)
    return NextResponse.json(
      { error: { email: "podany email już istnieje" } },
      { status: 422 }
    );

  const user = await prisma.user.create({
    data: {
      email,
      name: data.name,
      surename: data.surename,
      hashedPassword: password,
    },
  });

  if (!user)
    return NextResponse.json(
      { success: false },
      { status: 500, statusText: "something went wrong during user creation" }
    );

  const token = await prisma.verificationToken.create({
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
        statusText: "something went wrong during verification token creation",
      }
    );

  try {
    const customer = await stripe.customers.create({
      email,
      name: data.name,
    });
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: error.code, statusText: error.message }
    );
  }

  const { error }: any = await resend.emails.send({
    from: "Fizjotrenerka <onboarding@resend.dev>",
    to: ["cezary.makowski96@gmail.com"],
    subject: "Aktywacja konta",
    react: UserVerify({ name: data.name, token: token.token }),
  });
  if (error)
    return NextResponse.json(
      { success: false },
      { status: error.statusCode, statusText: error.message }
    );

  return NextResponse.json(user);
}
