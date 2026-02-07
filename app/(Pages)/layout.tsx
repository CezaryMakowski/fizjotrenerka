import TopContent from "@/components/TopContent";

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
