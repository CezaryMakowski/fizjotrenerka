import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("Stripe-Signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!sig) {
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "Stripe signature is missing" },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;

      const order = await prisma.order.findMany({
        where: {
          user: { stripeCustomerId: charge.customer as string },
          videoId: { not: null },
        },
        orderBy: { createdAt: "desc" },
        take: 1,
      });
      if (!order) {
        return NextResponse.json(
          { success: false },
          { status: 400, statusText: "no order was found in db" },
        );
      }

      const updatedOrder = await prisma.order.update({
        where: { id: order[0].id },
        data: { status: "COMPLETED" },
      });
      if (!updatedOrder) {
        return NextResponse.json(
          { success: false },
          {
            status: 400,
            statusText: "something went wrong during order update",
          },
        );
      }

      if (updatedOrder.videoId) {
        const updatedUser = await prisma.user.update({
          where: { stripeCustomerId: charge.customer as string },
          data: { videos: { connect: { id: updatedOrder.videoId } } },
        });

        if (!updatedUser) {
          return NextResponse.json(
            { success: false },
            {
              status: 400,
              statusText: "something went wrong during user update",
            },
          );
        }
      }
      break;
    default:
  }
  return NextResponse.json({ success: true });
}
