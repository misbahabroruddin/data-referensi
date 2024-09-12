export function generateMetadata() {
  return { title: "Jenis Syarat" };
}

export default function JenisSyaratLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
