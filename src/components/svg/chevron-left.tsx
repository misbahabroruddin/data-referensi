export function ChevronLeftIcon({
  width = "24",
  height = "24",
  color = "#10487A",
  className,
  ...props
}: SvgIconsProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M9.125 11.75C8.96875 11.9062 8.96875 12.125 9.125 12.2812L13.7188 16.9062C13.8438 17.0625 14.0938 17.0625 14.25 16.9062L14.8438 16.2812C15 16.125 15 15.9062 14.8438 15.75L11.1562 12L14.8438 8.28125C15 8.125 15 7.875 14.8438 7.75L14.25 7.125C14.0938 6.96875 13.8438 6.96875 13.7188 7.125L9.125 11.75Z"
        fill={color}
      />
    </svg>
  );
}
