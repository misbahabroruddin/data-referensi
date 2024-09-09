export function generateMetadata() {
  return { title: "Kabupaten" };
}

export default function KabupatenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
