export function generateMetadata() {
  return { title: "Trash Informasi | Data Referensi - UNSIA" };
}

export default function TrashInformasiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
