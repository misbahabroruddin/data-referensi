interface BasePageTitleProps {
  title: string;
}

export const BasePageTitle = ({ title = "Dashboard" }: BasePageTitleProps) => {
  return (
    <div className="flex items-center gap-1">
      <h1 className="text-base font-[500] lg:text-xl">{title}</h1>
    </div>
  );
};
