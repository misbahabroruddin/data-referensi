export function generateMetadata() {
  return { title: "Penilaian Rapor" };
}

export default function PenilaianRaporLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
