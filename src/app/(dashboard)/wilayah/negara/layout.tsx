export function generateMetadata() {
  return { title: "Negara" };
}

export default function NegaraLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
