"use client";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { nav } from "@/site.config";
import { cn } from "@/lib/cn";
import { ButtonLink } from "./buttons";
import { CurrencySwitcher } from "./currency";
import { LanguageNav } from "./language-nav";
import { Logo } from "./logo";
import { SmartLink } from "./smart-link";

const spring = { type: "spring", stiffness: 380, damping: 34, mass: 0.9 } as const;

function useScrolled(threshold = 24) {
  const [scrolled, set] = useState(false);
  useEffect(() => {
    const on = () => set(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}

/** Reads data-theme of whatever section sits under the header, ignoring the chrome itself. */
function useThemeUnder(y = 28) {
  const [theme, set] = useState<"light" | "dark">("light");
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .find((e) => !e.closest("[data-chrome]"));
      const t = el?.closest<HTMLElement>("[data-theme]");
      set(t?.dataset.theme === "dark" ? "dark" : "light");
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const timer = window.setTimeout(check, 50);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [y]);
  return theme;
}

export function Header() {
  const scrolled = useScrolled(24);
  const theme = useThemeUnder(28);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <header
      data-chrome
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-fast)] ease-ref",
        scrolled || theme === "dark" ? "text-paper" : "text-ink",
      )}
      style={{ "--panel-top": scrolled ? "56px" : "var(--header-h)" } as CSSProperties}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-14 bg-ink transition-transform duration-[var(--dur)] ease-ref",
          scrolled ? "translate-y-0" : "-translate-y-full",
        )}
      />
      <div
        className={cn(
          "relative flex items-center justify-between gap-4 px-[15px] transition-[height] duration-[var(--dur)] ease-ref md:px-7",
          scrolled ? "h-14" : "h-[var(--header-h)]",
        )}
      >
        <Logo className="relative z-10 min-w-0 shrink-0 [&>span:last-child]:hidden xs:[&>span:last-child]:inline xl:[&>span:last-child]:-translate-y-[7px]" />
        <LanguageNav
          className="absolute left-[95px] top-1/2 z-10 mt-[5px] hidden text-[12px] font-medium leading-none tracking-[0.04em] xl:block"
          linkClassName="px-[3px]"
        />
        <nav aria-label="Main" className="absolute left-1/2 top-0 hidden -translate-x-1/2 xl:block">
          <LayoutGroup id="desktop-nav">
            <ul className="flex items-start" onMouseLeave={() => setHover(null)}>
              {nav.main.map((item) => (
                <li key={item.href + item.label} className="relative">
                  <AnimatePresence>
                    {hover === item.href && (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden
                        className="absolute inset-x-3 bottom-3 h-[2px] rounded-full bg-current"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={spring}
                      />
                    )}
                  </AnimatePresence>
                  <SmartLink
                    href={item.href}
                    onMouseEnter={() => setHover(item.href)}
                    onFocus={() => setHover(item.href)}
                    onBlur={() => setHover(null)}
                    className="text-nav relative flex h-14 items-center whitespace-nowrap px-[0.95rem] transition-colors duration-300 2xl:px-[1.35rem]"
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </LayoutGroup>
        </nav>
        <div className="relative z-10 flex shrink-0 items-center gap-2 md:gap-4">
          <LanguageNav className="text-nav hidden md:block xl:hidden" />
          <CurrencySwitcher />
          <ButtonLink href={nav.cta.href} size="sm" className="md:h-10 md:px-5 md:text-[15px]">
            {nav.cta.label}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
