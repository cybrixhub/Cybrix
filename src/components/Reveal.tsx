import type { ElementType, ReactNode } from "react";

/**
 * Marks an element for the global scroll-reveal handled in SmoothScroll
 * (GSAP + ScrollTrigger). No client JS of its own — under reduced motion or
 * no-JS the content simply renders visible.
 */
type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  as?: ElementType;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  return (
    <Tag
      data-reveal=""
      data-reveal-delay={delay ? (delay / 1000).toString() : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
