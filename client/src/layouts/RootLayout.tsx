function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 w-full bg-white">
      <main className="bg-white flex-1">{children}</main>
    </div>
  );
}

export default RootLayout;