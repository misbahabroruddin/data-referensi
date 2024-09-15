export function generateMetadata() {
  return { title: "Luaran Wajib" };
}

export default function LauranWajibLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
