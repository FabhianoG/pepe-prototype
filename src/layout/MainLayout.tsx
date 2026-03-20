import Header from './Header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex flex-col min-h-screen
        bg-linear-to-br
        from-[#dce9eb]
        via-[#6caedf]
        to-[#bedadc]
      "
    >
      <Header />

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
