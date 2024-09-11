export function generateMetadata() {
  return { title: "Kebutuhan Khusus" };
}

export default function KebutuhanKhususLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
