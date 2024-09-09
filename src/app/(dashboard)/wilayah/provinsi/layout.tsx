export function generateMetadata() {
  return { title: "Provinsi" };
}

export default function ProvinsiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
