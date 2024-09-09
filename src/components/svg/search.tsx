export const SearchIcon: React.FC<SvgIconsProps> = ({
  height = 24,
  width = 25,
  color = "#ffffff",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.875 18.6562C20.0312 18.8125 20.0312 19.0625 19.875 19.1875L19.1562 19.9062C19.0312 20.0625 18.7812 20.0625 18.625 19.9062L14.8438 16.125C14.7812 16.0312 14.75 15.9375 14.75 15.8438V15.4375C13.5938 16.4062 12.125 17 10.5 17C6.90625 17 4 14.0938 4 10.5C4 6.9375 6.90625 4 10.5 4C14.0625 4 17 6.9375 17 10.5C17 12.125 16.375 13.625 15.4062 14.75H15.8125C15.9062 14.75 16 14.8125 16.0938 14.875L19.875 18.6562ZM10.5 15.5C13.25 15.5 15.5 13.2812 15.5 10.5C15.5 7.75 13.25 5.5 10.5 5.5C7.71875 5.5 5.5 7.75 5.5 10.5C5.5 13.2812 7.71875 15.5 10.5 15.5Z"
        fill="black"
      />
    </svg>
  );
};