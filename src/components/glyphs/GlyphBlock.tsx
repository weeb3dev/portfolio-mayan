import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
};

export function GlyphBlock({ children, className, size = "md" }: Props) {
  return (
    <span
      className={`glyph-block glyph-block--${size} ${className ?? ""}`}
      aria-hidden={typeof children === "string" ? undefined : true}
    >
      {children}
    </span>
  );
}
