export function generateMetadata() {
  return { title: "Rincian Biaya" };
}

export default function RincianBiayaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
