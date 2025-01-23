import { TContactFormSchema, contactFormSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_SECRET);

export async function POST(req: NextRequest) {
  const data: TContactFormSchema = await req.json();

  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }

  const { error }: any = await resend.emails.send({
    from: `${data.email} <onboarding@resend.dev>`,
    to: ["hempcapone@gmail.com"],
    subject: `masz nową wiadomość od ${data.name}`,
    text: data.message,
  });
  if (error)
    return NextResponse.json(
      { success: false },
      { status: error.statusCode, statusText: error.message }
    );

  return NextResponse.json({ success: true });
}
