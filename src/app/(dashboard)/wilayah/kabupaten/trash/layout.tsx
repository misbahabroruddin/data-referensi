export function generateMetadata() {
  return { title: "Trash Kabupaten | Data Referensi - Unsia" };
}

export default function KabupatenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
