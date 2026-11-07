"use client";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Journey } from "@/site.config";
import { ui } from "@/site.config";
import { ArrowLink } from "./arrow-link";
import { FromPrice } from "./currency";
import { Close } from "./icons";
import { Photo } from "./photo";
import { RichText } from "./rich-text";

const ease = [0.22, 1, 0.36, 1] as const;

/* Tile shapes for the two staggered columns, repeating every four tiles. */
const left = [
  { w: "100%", ar: 1.01, self: "start" },
  { w: "70%", ar: 0.95, self: "end" },
  { w: "100%", ar: 1.35, self: "start" },
  { w: "70%", ar: 0.71, self: "end" },
];
const right = [
  { w: "70%", ar: 0.81, self: "start" },
  { w: "100%", ar: 1.16, self: "start" },
  { w: "70%", ar: 0.84, self: "start" },
  { w: "100%", ar: 1.35, self: "start" },
];

function Tile({
  item,
  number,
  style,
  delay,
  onOpen,
}: {
  item: Journey;
  number: number;
  style: CSSProperties;
  delay: number;
  onOpen: (el: HTMLElement) => void;
}) {
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
      className="relative"
    >
      <button
        type="button"
        className="group relative block h-full w-full overflow-hidden bg-tint text-left outline-offset-4 [contain:paint]"
        onClick={(e) => onOpen(e.currentTarget)}
        aria-haspopup="dialog"
        aria-label={`${item.title}: ${ui.openStory}`}
      >
        <Photo
          src={item.image.src}
          sizes="(min-width: 768px) 46vw, 48vw"
          className="transition-transform duration-[1.2s] ease-ref group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent transition-opacity duration-[var(--dur)] ease-ref group-hover:opacity-90"
        />
        <div className="absolute inset-x-0 bottom-0 p-3 text-paper md:p-[30px]">
          <h3 className="text-h3 flex items-baseline gap-[0.4em] text-balance">
            <span className="text-micro shrink-0 tabular-nums">{String(number).padStart(2, "0")}</span>
            <span className="min-w-0 break-words">{item.title}</span>
          </h3>
        </div>
      </button>
    </motion.div>
  );
}

function Story({ item, onClose }: { item: Journey; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  const s = item.story;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`story-${item.id}`}
      data-theme="dark"
      data-chrome
      className="fixed inset-0 z-[80] overflow-y-auto overflow-x-hidden overscroll-contain bg-ink text-paper"
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.8, ease }}
    >
      <motion.div
        aria-hidden
        className="fixed inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        <Photo src={item.image.src} sizes="100vw" />
        <div className="absolute inset-0 bg-ink/60" />
      </motion.div>
      <button
        ref={close}
        type="button"
        onClick={onClose}
        aria-label={ui.closeStory}
        className="fixed right-[15px] top-[15px] z-10 grid size-11 place-items-center rounded-blob bg-paper text-ink transition-transform duration-[var(--dur)] ease-ref hover:rotate-90 md:right-7 md:top-6 md:size-14"
      >
        <Close className="size-5 md:size-6" />
      </button>
      <div className="gutter relative min-h-full pb-[calc(var(--bar-h)+48px)] pt-[22px] md:pb-24 md:pl-[30vw] md:pr-[2vw] md:pt-[57px]">
        <motion.p
          className="text-[13.5px] font-medium tracking-[-0.03em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {s.label}
        </motion.p>
        <motion.h2
          id={`story-${item.id}`}
          className="text-story mt-[18vh] text-pretty md:mt-[24vh]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease }}
        >
          <RichText text={s.text} />
        </motion.h2>
        <motion.div
          className="mt-12 flex flex-col gap-8 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease }}
        >
          {(s.facts.length > 0 || s.priceFrom) && (
            <ul className="flex flex-wrap gap-2">
              {s.facts.map((f) => (
                <li key={f} className="rounded-full border border-paper/50 px-4 py-2 text-[14px] md:text-[16px]">
                  {f}
                </li>
              ))}
              {s.priceFrom && (
                <li className="rounded-full bg-highlight px-4 py-2 text-[14px] font-medium text-ink md:text-[16px]">
                  <FromPrice amount={s.priceFrom} />
                </li>
              )}
            </ul>
          )}
          <div className="flex flex-col gap-4 md:flex-row md:gap-10">
            {s.links.map((l) => (
              <ArrowLink
                key={l.label}
                href={l.href}
                className="text-[20px] md:text-[23px]"
                arrowClassName="text-highlight"
              >
                {l.label}
              </ArrowLink>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Two staggered columns of journey photos; each opens a full-screen story (?story=id). */
export function StoryMosaic({ items }: { items: Journey[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const pushed = useRef(false);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((id: string, el: HTMLElement) => {
    opener.current = el;
    setOpenId(id);
    window.history.pushState(window.history.state, "", `?story=${encodeURIComponent(id)}`);
    pushed.current = true;
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    if (pushed.current) {
      pushed.current = false;
      window.history.back();
    } else if (window.location.search.includes("story=")) {
      window.history.replaceState(window.history.state, "", window.location.pathname);
    }
    opener.current?.focus();
  }, []);

  useEffect(() => {
    const sync = () => {
      const q = new URLSearchParams(window.location.search).get("story");
      const id = q && items.some((i) => i.id === q) ? q : null;
      if (!id) pushed.current = false;
      setOpenId(id);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [items]);

  const evens = items.filter((_, i) => i % 2 === 0);
  const odds = items.filter((_, i) => i % 2 === 1);
  const active = items.find((i) => i.id === openId);

  const column = (list: Journey[], shapes: typeof left, base: number) =>
    list.map((item, n) => {
      const shape = shapes[n % 4];
      return (
        <Tile
          key={item.id}
          item={item}
          number={items.indexOf(item) + 1}
          style={{
            width: shape.w,
            aspectRatio: String(shape.ar),
            alignSelf: shape.self === "end" ? "flex-end" : "flex-start",
          }}
          delay={(n % 2) * 0.08 + base}
          onOpen={(el) => open(item.id, el)}
        />
      );
    });

  return (
    <>
      <div className="grid grid-cols-2 gap-[10px] md:gap-[1.95vw]">
        <div className="flex min-w-0 flex-col gap-[10px] md:gap-[1.95vw]">{column(evens, left, 0)}</div>
        <div className="flex min-w-0 flex-col gap-[10px] pt-[11vw] md:gap-[1.95vw] md:pt-[7.5vw]">
          {column(odds, right, 0.1)}
        </div>
      </div>
      <AnimatePresence>{active && <Story key={active.id} item={active} onClose={close} />}</AnimatePresence>
    </>
  );
}
