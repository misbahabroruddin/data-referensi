export function generateMetadata() {
  return { title: "Gelombang" };
}

export default function GelombangLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
