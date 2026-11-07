"use client";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { brand, contact, nav, ui } from "@/site.config";
import { ArrowLink } from "./arrow-link";
import { ButtonLink } from "./buttons";
import { Close } from "./icons";
import { LanguageNav } from "./language-nav";
import { SmartLink } from "./smart-link";

const spring = { type: "spring", stiffness: 380, damping: 34 } as const;
const ease = [0.22, 1, 0.36, 1] as const;

function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    first.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-sheet"
          data-chrome
          data-theme="dark"
          role="dialog"
          aria-modal="true"
          aria-label={ui.menu}
          className="fixed inset-x-0 top-0 bottom-[var(--bar-h)] z-[45] overflow-y-auto bg-ink text-paper xl:hidden"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="gutter flex min-h-full flex-col pt-[calc(var(--header-h)+24px)] pb-10">
            <button
              type="button"
              onClick={onClose}
              aria-label={ui.closeMenu}
              className="absolute right-[15px] top-[calc(var(--header-h)+8px)] grid size-10 place-items-center"
            >
              <Close className="size-6" />
            </button>
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}
            >
              {nav.main.map((item, i) => (
                <motion.li
                  key={item.href + item.label}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease }}
                >
                  <SmartLink
                    ref={i === 0 ? first : undefined}
                    href={item.href}
                    onClick={onClose}
                    className="text-h1 inline-flex items-baseline gap-3 py-1"
                  >
                    <span className="text-micro tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </SmartLink>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-auto flex flex-col gap-5 pt-10">
              <LanguageNav className="text-nav" linkClassName="px-1.5 py-1" />
              <ButtonLink href={nav.cta.href} size="lg" className="self-start">
                {nav.cta.label}
              </ButtonLink>
              <div className="flex flex-col gap-3">
                <ArrowLink href={`mailto:${contact.email}`} arrowClassName="text-highlight" className="break-all">
                  {contact.email}
                </ArrowLink>
              </div>
              <p className="text-micro opacity-60">{brand.tagline}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Fixed bottom bar on phones and tablets: three shortcuts and the menu sheet. */
export function MobileBar() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const items = [...nav.quick.map((l) => ({ ...l, key: l.href })), { label: ui.menu, href: "menu", key: "menu" }];
  const cls = "text-nav relative flex h-full items-center px-4";

  return (
    <>
      <nav
        data-chrome
        aria-label="Quick"
        className="fixed inset-x-0 bottom-0 z-50 h-[var(--bar-h)] bg-ink text-paper pb-[env(safe-area-inset-bottom)] xl:hidden"
      >
        <LayoutGroup id="mobile-nav">
          <ul className="flex h-full items-stretch justify-between px-2">
            {items.map((item) => {
              const active = open && item.key === "menu";
              const inner = (
                <>
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        layoutId="mobile-underline"
                        aria-hidden
                        className="absolute inset-x-4 bottom-2.5 h-[2px] rounded-full bg-current"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={spring}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative">{item.label}</span>
                </>
              );
              return (
                <li key={item.key} className="relative flex">
                  {item.key === "menu" ? (
                    <button
                      type="button"
                      className={cls}
                      aria-expanded={open}
                      aria-controls="menu-sheet"
                      onClick={() => setOpen((o) => !o)}
                    >
                      {inner}
                    </button>
                  ) : (
                    <SmartLink href={item.href} className={cls} onClick={close}>
                      {inner}
                    </SmartLink>
                  )}
                </li>
              );
            })}
          </ul>
        </LayoutGroup>
      </nav>
      <MenuSheet open={open} onClose={close} />
    </>
  );
}
