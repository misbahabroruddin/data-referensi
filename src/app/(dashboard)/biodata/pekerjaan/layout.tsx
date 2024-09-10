export function generateMetadata() {
  return { title: "Pekerjaan" };
}

export default function PekerjaanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
