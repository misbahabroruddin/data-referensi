export function generateMetadata() {
  return { title: "Komposisi" };
}

export default function KomposisiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
