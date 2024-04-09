import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";

export const OPTIONS: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.hashedPassword!
        );

        if (!isPasswordValid) {
          return null;
        }

        if (!user.active) return { error: "not active" };

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-11-15",
      });
      if (user.name && user.email) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        });
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id },
        });
      }
    },
  },
  callbacks: {
    async signIn({ user }) {
      if (user?.error === "not active") {
        throw new Error("not active");
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          role: user.role,
          id: user.id,
          surename: user.surename,
          newsletter: user.newsletter,
        };
      }
      if (trigger === "update") {
        if (session.name) token.name = session.name;
        if (session.surename) token.surename = session.surename;
        if (session.email) token.surename = session.email;
        token.newsletter = session.newsletter;
        if (session.thumbnail) token.picture = session.thumbnail;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.surename = token.surename;
      session.user.newsletter = token.newsletter;
      return session;
    },
  },
};
