export function generateMetadata() {
  return { title: "Jenis Dokumen" };
}

export default function JenisDokumenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
