export function generateMetadata() {
  return { title: "Informasi" };
}

export default function InformasiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
