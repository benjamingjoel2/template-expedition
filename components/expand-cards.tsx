"use client";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import type { NavLink, Photo as PhotoT } from "@/site.config";
import { ui } from "@/site.config";
import { cn } from "@/lib/cn";
import { ArrowLink } from "./arrow-link";
import { Plus } from "./icons";
import { Photo } from "./photo";

type Card = { id: string; eyebrow: string; title: string; body: string; link?: NavLink; image: PhotoT };

function ExpandCard({ card }: { card: Card }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="group relative aspect-[4/5] overflow-hidden bg-ink text-paper md:aspect-[3/4.3]">
      <Photo
        src={card.image.src}
        sizes="(min-width: 768px) 32vw, 90vw"
        className={cn("transition-transform duration-[1.2s] ease-ref", open ? "scale-110" : "group-hover:scale-[1.05]")}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-colors duration-[var(--dur)] ease-ref",
          open ? "bg-ink/80" : "bg-gradient-to-b from-ink/60 via-ink/5 to-ink/30",
        )}
      />
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="absolute inset-0 flex flex-col items-start p-[15px] text-left md:p-[28px]"
      >
        <span className="text-micro mb-2 md:mb-3">{card.eyebrow}</span>
        <span className="text-[29px] font-medium leading-[0.99] tracking-[-0.035em] text-balance md:text-[clamp(1.75rem,3.47vw,3.75rem)]">
          {card.title}
        </span>
        <span
          aria-hidden
          className={cn(
            "absolute bottom-[15px] right-[15px] grid size-11 place-items-center rounded-blob bg-accent transition-transform duration-[var(--dur)] ease-ref md:bottom-[28px] md:right-[28px] md:size-14",
            open && "rotate-45",
          )}
        >
          <Plus className="size-5 md:size-6" />
        </span>
        <span className="sr-only">{open ? ui.hideDetails : ui.showDetails}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="pointer-events-none absolute inset-x-0 bottom-0 p-[15px] pr-16 md:p-[28px] md:pr-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-body-lg">{card.body}</p>
            {card.link && (
              <div className="pointer-events-auto mt-5">
                <ArrowLink href={card.link.href} arrowClassName="text-highlight">
                  {card.link.label}
                </ArrowLink>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Three photo cards in a "podium" stagger that flip open to reveal a short text. */
export function ExpandCards({ cards }: { cards: Card[] }) {
  return (
    <ul className="grid gap-[15px] md:grid-cols-3 md:items-start md:gap-[28px]">
      {cards.map((card, i) => (
        <li
          key={card.id}
          className={cn(
            ["md:mt-[8vw]", "md:mt-0", "md:mt-[18vw]"][i % 3],
            i % 2 === 0 ? "ml-[8vw] md:ml-0" : "mr-[8vw] md:mr-0",
          )}
        >
          <ExpandCard card={card} />
        </li>
      ))}
    </ul>
  );
}
