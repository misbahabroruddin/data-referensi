export function generateMetadata() {
  return { title: "Jenis Program" };
}

export default function JenisProgramLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
