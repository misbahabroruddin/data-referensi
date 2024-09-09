export function generateMetadata() {
  return { title: "Kecamatan" };
}

export default function KecamatanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
