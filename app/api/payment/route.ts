import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { OPTIONS } from "@/lib/nextAuth";
import { getServerSession } from "next-auth/next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const baseURL = process.env.NEXTAUTH_URL;

export async function POST(req: NextRequest) {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return NextResponse.json(
      { success: false, redirect: `login?loginFirst=true` },
      { status: 401 },
    );
  }
  let data = await req.json();

  let user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
      videos: { some: { stripeId: data.productId } },
    },
  });

  if (user) {
    return NextResponse.json(
      { success: false, redirect: `/filmy?isBought=true` },
      {
        status: 401,
        statusText: "This video is already in posession of this user",
      },
    );
  }

  let order;
  if (data.video) {
    order = await prisma.order.create({
      data: {
        amount: data.amount,
        user: { connect: { id: session.user.id } },
        video: { connect: { id: data.productId } },
      },
      include: { user: { select: { stripeCustomerId: true } } },
    });
    if (!order) {
      return NextResponse.json(
        { success: false },
        {
          status: 400,
          statusText: "something went wrong during Order creation",
        },
      );
    }
  } else {
    return NextResponse.json(
      { success: false },
      {
        status: 400,
        statusText: "only videos are supported at the moment",
      },
    );
  }

  try {
    const paymentSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      customer: order.user.stripeCustomerId!,
      mode: "payment",
      success_url: `${baseURL}/filmy`,
      cancel_url: `${baseURL}/sklep`,
    });

    return NextResponse.json(paymentSession.url);
  } catch (error: any) {
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: `${error.type} ${error.message}` },
    );
  }
}
