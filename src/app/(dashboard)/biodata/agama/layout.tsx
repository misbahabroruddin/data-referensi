export function generateMetadata() {
  return { title: "Agama" };
}

export default function AgamaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
