export function generateMetadata() {
  return { title: "Pengumuman" };
}

export default function PengumumanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
