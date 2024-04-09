"use client";

import { signOut } from "next-auth/react";

export default function SignOutBtn() {
  return <a onClick={() => signOut()}>Wyloguj</a>;
}
