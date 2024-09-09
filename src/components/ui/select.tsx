"use client";

import clsx from "clsx";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";

const controlStyles = {
  base: "border border-black-09 rounded-lg bg-background hover:cursor-pointer hover:bg-gray-100",
  focus:
    "border border-black-09 ring-ring ring-black-08 focus-visible:ring-black-08",
  nonFocus: "border border-black-09",
};
const placeholderStyles = "text-muted-foreground text-sm ml-3";
const selectInputStyles = "text-foreground text-sm ml-3";
const valueContainerStyles = "text-foreground text-sm flex gap-1 py-1";
const singleValueStyles = "ml-3";
const multiValueStyles =
  "ml-3 bg-background border border-border rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
  "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md bg-background";
const indicatorsContainerStyles =
  "pr-1 gap-1 bg-background rounded-r-lg rounded";
const clearIndicatorStyles = "text-gray-500 pl-1 rounded-md hover:text-red-800";
const indicatorSeparatorStyles = "bg-mutated";
const dropdownIndicatorStyles = "hover:text-foreground text-gray-500";
const menuStyles =
  "mt-2 p-2 border border-border bg-background text-sm rounded-lg z-50";
const optionsStyle =
  "bg-background p-2 border-0 text-base hover:bg-secondary hover:cursor-pointer z-50";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm bg-background";
const noOptionsMessageStyles = "text-muted-foreground bg-background";

type SelectComponentProps = {
  options: any[];
  value?: any;
  onChange?: (value: any) => void;
  isMulti?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  createAble: boolean;
  placeholder?: string;
  isError?: boolean | FieldError | any;
};

export const SelectComponent = forwardRef<any, SelectComponentProps>(
  (
    {
      options,
      value,
      onChange,
      isMulti,
      isDisabled,
      isLoading,
      createAble,
      placeholder,
      isError,
      ...props
    },
    ref,
  ) => {
    const animatedComponents = makeAnimated();
    const Comp = createAble ? CreatableSelect : Select;
    return (
      <Comp
        ref={ref}
        unstyled
        isClearable
        isSearchable
        value={value}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isLoading={isLoading}
        placeholder={placeholder}
        components={animatedComponents}
        defaultValue={value}
        options={options}
        noOptionsMessage={() => "No options found !!"}
        onChange={onChange}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base,
              isError && `${controlStyles.base} border-red-500`,
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          option: () => optionsStyle,
          menu: () => menuStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          groupHeading: () => groupHeadingStyles,
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        maxMenuHeight={180}
        {...props}
      />
    );
  },
);

SelectComponent.displayName = "SelectComponent";
