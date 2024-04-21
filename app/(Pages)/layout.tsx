import TopContent from "@/components/TopContent";

export const metadata = {
  title: "Trenuj szczęście",
  description: "strona Patrycji Puszkarek",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopContent />
      {children}
    </>
  );
}
