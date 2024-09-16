export function generateMetadata() {
  return { title: "Jenjang Pendidikan" };
}

export default function JenjangPendidikanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
