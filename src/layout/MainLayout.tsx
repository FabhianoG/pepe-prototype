import Header from "./Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      
      <Header />

      <main className="p-6">
        {children}
      </main>

    </div>
  );
}
