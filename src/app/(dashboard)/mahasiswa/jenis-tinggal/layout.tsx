export function generateMetadata() {
  return { title: "Jenis Tinggal" };
}

export default function JenisTinggalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
