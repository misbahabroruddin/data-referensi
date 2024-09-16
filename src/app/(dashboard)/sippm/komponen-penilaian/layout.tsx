export function generateMetadata() {
  return { title: "Komponen Penilaian" };
}

export default function KomponenPenilaianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
