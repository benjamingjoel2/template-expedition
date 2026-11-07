"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { currencies, ui } from "@/site.config";
import { cn } from "@/lib/cn";

const KEY = "expedition.currency";
const fallback = currencies[0].code;
const listeners = new Set<() => void>();

function read() {
  try {
    const v = localStorage.getItem(KEY);
    if (v && currencies.some((c) => c.code === v)) return v;
  } catch {}
  return fallback;
}

function setCurrency(code: string) {
  try {
    localStorage.setItem(KEY, code);
  } catch {}
  listeners.forEach((l) => l());
}

export function useCurrency() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    read,
    () => fallback,
  );
}

export function formatPrice(base: number, code: string) {
  const c = currencies.find((x) => x.code === code) ?? currencies[0];
  const v = Math.round((base * c.rate) / c.roundTo) * c.roundTo;
  return new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency: c.code,
    maximumFractionDigits: 0,
  }).format(v);
}

export function FromPrice({ amount }: { amount: number }) {
  const code = useCurrency();
  const [before, after] = ui.fromPrice.split("{price}");
  return (
    <span>
      {before}
      <span data-currency={code}>{formatPrice(amount, code)}</span>
      {after}
    </span>
  );
}

export function CurrencySwitcher() {
  const code = useCurrency();
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const current = currencies.find((c) => c.code === code) ?? currencies[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (currencies.length < 2) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${ui.currency}: ${current.label}. ${ui.changeCurrency}`}
        onClick={() => setOpen((o) => !o)}
        className="text-nav inline-flex h-9 items-center gap-1.5 rounded-full px-2 transition-opacity hover:opacity-70"
      >
        <span aria-hidden className="text-[1.15em] leading-none">
          {current.symbol}
        </span>
        <span>{current.code}</span>
        <svg aria-hidden viewBox="0 0 10 6" className={cn("w-2.5 transition-transform duration-300", open && "rotate-180")}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={id}
            role="listbox"
            aria-label={ui.chooseCurrency}
            className="fixed right-0 top-[var(--panel-top,64px)] z-[70] flex w-full sm:w-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              closed: { transition: { staggerChildren: 0.03 } },
            }}
          >
            {currencies.map((c) => {
              const selected = c.code === code;
              return (
                <motion.li
                  key={c.code}
                  className="flex-1 sm:flex-none"
                  variants={{ open: { x: 0, opacity: 1 }, closed: { x: "120%", opacity: 0 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      setCurrency(c.code);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex h-[72px] w-full flex-col items-start justify-between p-3 text-left transition-colors duration-300 sm:h-[86px] sm:w-[118px] md:w-[140px] md:p-4",
                      selected ? "bg-accent text-paper" : "bg-ink text-paper hover:bg-ink-soft",
                    )}
                  >
                    <span className="text-[18px] font-medium leading-none tracking-[-0.04em] md:text-[22px]">{c.code}</span>
                    <span className="text-[12px] leading-tight opacity-75">
                      {c.symbol}
                      <span className="hidden sm:inline"> {c.label}</span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
