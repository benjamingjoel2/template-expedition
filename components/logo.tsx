import Link from "next/link";
import { brand } from "@/site.config";
import { cn } from "@/lib/cn";

/** Round monogram plus brand name, both from site.config.ts. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${brand.name}, home`} className={cn("group inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className="grid size-[38px] place-items-center rounded-full bg-accent text-[13px] font-medium tracking-[-0.06em] text-paper ring-2 ring-accent ring-offset-2 ring-offset-transparent transition-transform duration-[var(--dur)] ease-ref group-hover:rotate-[-8deg] md:size-[55px] md:text-[18px]"
      >
        {brand.monogram}
      </span>
      <span className="text-[17px] font-medium leading-none tracking-[-0.04em] md:text-[20px]">{brand.name}</span>
    </Link>
  );
}
