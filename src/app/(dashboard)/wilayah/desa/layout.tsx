export function generateMetadata() {
  return { title: "Desa" };
}

export default function DesaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
