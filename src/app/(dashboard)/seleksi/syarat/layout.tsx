export function generateMetadata() {
  return { title: "Syarat" };
}

export default function SyaratLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
