export function generateMetadata() {
  return { title: "Jabatan Fungsional" };
}

export default function JabatanFungsionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
