import * as React from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";
import { ImportIcon } from "../svg/import";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactElement;
  containerInputIconClass?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerInputIconClass, type, icon, ...props }, ref) => {
    return (
      <div
        className={cn("relative col-span-6 w-full", containerInputIconClass)}
      >
        <label
          className="absolute left-2 top-1/2 z-40 -translate-y-1/2"
          htmlFor={props.id}
        >
          {icon}
        </label>
        <input
          type={type}
          className={cn(
            "ring-offset-black-9 border-black-09 focus-visible:ring-black-08 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            icon ? "relative w-full pl-9" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
InputWithIcon.displayName = "InputWithIcon";

export const InputFileImport = React.forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, ...props }, ref) => {
    return (
      <label
        htmlFor="file_import"
        className="border-black-08 relative flex h-10 w-32 cursor-pointer items-center justify-center rounded border bg-background px-4 py-[9.5] transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {props.disabled ? (
          <div className="flex gap-2">
            <Spinner className="h-4 w-4" />
            <span>Loading</span>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <ImportIcon color="black" />
              <span>Import</span>
            </div>
            <input
              type="file"
              name="file_import"
              id="file_import"
              className="hidden"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={onChange}
              ref={ref}
              {...props}
            />
          </>
        )}
      </label>
    );
  },
);

InputFileImport.displayName = "InputFileImport";

export { Input, InputWithIcon };
