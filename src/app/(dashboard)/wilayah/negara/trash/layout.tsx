export function generateMetadata() {
  return { title: "Trash Negara | Data Referensi - Unsia" };
}

export default function NegaraLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
