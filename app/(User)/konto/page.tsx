import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import UserInfoForm from "@/components/account/UserInfoForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import DeleteAccount from "@/components/account/DeleteAccount";
import EntranceAnimtion from "@/components/account/EntranceAnimation";

export default async function Konto() {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    redirect("/login");
  }

  return (
    <EntranceAnimtion>
      <main>
        <UserInfoForm />
        <DeleteAccount />
      </main>
    </EntranceAnimtion>
  );
}
