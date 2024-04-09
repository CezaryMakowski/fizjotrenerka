import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "CUSTOMER";
    id: string;
    surename: string;
    newsletter: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      name: string;
      email: string;
      image: string;
      surename: string;
      newsletter: boolean;
    };
  }

  interface User {
    role: UserRole;
    error: string;
    surename: string;
    newsletter: boolean;
  }
}
