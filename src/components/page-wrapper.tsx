export const PageWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="mt-2 rounded-lg border border-[#F1F1F1] bg-white px-6 py-4">
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};
