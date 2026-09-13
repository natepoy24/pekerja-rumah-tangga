import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCompanyIdentity } from "@/lib/settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCompanyIdentity();

  return (
    <>
      <Navbar company={company} />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer company={company} />
    </>
  );
}

