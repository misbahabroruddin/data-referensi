export function generateMetadata() {
  return { title: "Jenis Penelitian" };
}

export default function JenisPenelitianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
