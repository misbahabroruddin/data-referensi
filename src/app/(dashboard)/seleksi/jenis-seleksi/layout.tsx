export function generateMetadata() {
  return { title: "Jenis Seleksi" };
}

export default function JenisSeleksiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
