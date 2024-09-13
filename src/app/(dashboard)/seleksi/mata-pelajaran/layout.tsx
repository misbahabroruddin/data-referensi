export function generateMetadata() {
  return { title: "Mata Pelajaran" };
}

export default function MataPelajaranLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
