export function generateMetadata() {
  return { title: "Transportasi" };
}

export default function TransportasiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
