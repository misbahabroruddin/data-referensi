export function generateMetadata() {
  return { title: "Penghasilan" };
}

export default function PenghasilanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
