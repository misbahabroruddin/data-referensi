export function generateMetadata() {
  return { title: "Kriteria Penilaian" };
}

export default function KriteriaPenilaianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
