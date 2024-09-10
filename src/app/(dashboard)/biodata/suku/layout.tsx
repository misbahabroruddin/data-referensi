export function generateMetadata() {
  return { title: "Suku" };
}

export default function SukuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
