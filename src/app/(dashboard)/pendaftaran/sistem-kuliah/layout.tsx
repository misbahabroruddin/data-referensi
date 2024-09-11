export function generateMetadata() {
  return { title: "Sistem Kuliah" };
}

export default function SistemKuliahLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
