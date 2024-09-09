export function generateMetadata() {
  return { title: "Trash Desa | Data Referensi - Unsia" };
}

export default function DesaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
