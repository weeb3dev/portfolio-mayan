type Props = {
  className?: string;
};

/** Cowrie/shell zero glyph from Maya numerical system */
export function ShellZero({ className }: Props) {
  return (
    <svg
      className={`shell-zero ${className ?? ""}`}
      viewBox="0 0 40 28"
      width="40"
      height="28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse
        cx="20"
        cy="14"
        rx="16"
        ry="10"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M8 14h24M12 9.5h16M12 18.5h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="20" cy="14" r="1.8" fill="currentColor" />
    </svg>
  );
}
