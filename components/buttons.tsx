import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SmartLink } from "./smart-link";

const variants = {
  accent: "bg-accent text-paper hover:bg-accent-deep",
  ink: "bg-ink text-paper hover:bg-ink-soft",
  paper: "bg-paper text-ink hover:bg-sand",
};
const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[15px] md:h-12 md:px-6 md:text-[16px]",
  lg: "h-14 px-7 text-[17px] md:h-16 md:px-9 md:text-[20px]",
};
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.03em] rounded-blob-pill transition-[background-color,transform,border-radius] duration-[var(--dur)] ease-ref hover:[border-radius:780px_999px_800px_920px/920px_800px_999px_780px] active:scale-[0.97]";

export function ButtonLink({
  href,
  variant = "accent",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}) {
  return (
    <SmartLink href={href} className={cn(base, sizes[size], variants[variant], className)}>
      {children}
    </SmartLink>
  );
}

/** Round "blob" icon button used for arrows and carousel controls. */
export function BlobButton({
  label,
  className,
  children,
  variant = "accent",
  ...rest
}: Omit<ComponentProps<"button">, "type"> & {
  label: string;
  variant?: keyof typeof variants;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "grid size-[52px] place-items-center rounded-blob transition-[border-radius,transform,background-color] duration-[var(--dur)] ease-ref hover:scale-105 hover:[border-radius:56%_44%_58%_42%/46%_56%_44%_54%] md:h-[56px] md:w-[60px]",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
