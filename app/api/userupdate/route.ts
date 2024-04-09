import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { TUserInfoSchema, UserInfoSchema } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function PATCH(req: NextRequest) {
  const data: TUserInfoSchema = await req.json();

  const result = UserInfoSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }

  let password;
  if (data.password) {
    password = await bcrypt.hash(data.password, 12);
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser)
    return NextResponse.json(
      { error: { email: "podany email już istnieje" } },
      { status: 422 }
    );

  const user = await prisma.user.update({
    where: { id: data.id },
    data: {
      image: data.thumbnail ? data.thumbnail : undefined,
      email: data.email ? data.email : undefined,
      name: data.name ? data.name : undefined,
      surename: data.surename ? data.surename : undefined,
      hashedPassword: password,
      newsletter: data.newsletter,
    },
  });

  if (!user)
    return NextResponse.json(
      { success: false },
      { status: 500, statusText: "something went wrong during user creation" }
    );

  try {
    await stripe.customers.update(user.stripeCustomerId!, {
      email: data.email ? data.email : undefined,
      name: data.name ? data.name : undefined,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: error.code, statusText: error.message }
    );
  }

  return NextResponse.json(user);
}

export async function DELETE(req: NextRequest) {
  const userId = await req.json();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  if (!deletedUser)
    return NextResponse.json(
      { success: false },
      {
        status: 500,
        statusText: "something went wrong when trying to delete user from db",
      }
    );

  try {
    await stripe.customers.del(deletedUser.stripeCustomerId!);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: error.code, statusText: error.message }
    );
  }

  return NextResponse.json(deletedUser);
}
