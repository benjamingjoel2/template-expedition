import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SmartLink } from "./smart-link";

/** Text link with a leading arrow and an underline that draws in on hover. */
export function ArrowLink({
  href,
  children,
  className,
  arrowClassName,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrowClassName?: string;
  onClick?: () => void;
}) {
  return (
    <SmartLink
      href={href}
      onClick={onClick}
      className={cn("group inline-flex items-baseline gap-[0.45em] text-link", className)}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block transition-transform duration-[var(--dur-fast)] ease-ref group-hover:translate-x-1.5",
          arrowClassName,
        )}
      >
        →
      </span>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-[var(--dur)] ease-ref group-hover:bg-[length:100%_1px]">
        {children}
      </span>
    </SmartLink>
  );
}
