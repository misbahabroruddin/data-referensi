import * as React from "react";

import { cn } from "@/lib/utils";

export interface DivProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Spinner = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary",
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);
Spinner.displayName = "Spinner";

export { Spinner };
