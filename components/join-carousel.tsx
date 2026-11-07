"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TripCard } from "@/site.config";
import { ui } from "@/site.config";
import { cn } from "@/lib/cn";
import { BlobButton } from "./buttons";
import { ArrowLeft, ArrowRight } from "./icons";
import { Photo } from "./photo";
import { RichText } from "./rich-text";
import { SmartLink } from "./smart-link";

function Card({ card }: { card: TripCard }) {
  return (
    <SmartLink
      href={card.href}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden p-[15px] md:p-[29px]",
        card.image ? "bg-stone text-paper" : "bg-accent text-paper",
      )}
    >
      {card.image && (
        <>
          <Photo
            src={card.image.src}
            sizes="(min-width: 768px) 34vw, 60vw"
            className="transition-transform duration-[1.2s] ease-ref group-hover:scale-[1.06]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/10 to-ink/55" />
        </>
      )}
      <h3 className="relative text-[28px] font-medium leading-[0.99] tracking-[-0.035em] text-balance md:text-[clamp(1.75rem,3.47vw,3.75rem)]">
        <RichText text={card.title} />
      </h3>
      <div className="relative flex items-end justify-between gap-4">
        <div>
          {card.body && <p className="mb-3 hidden max-w-[28ch] text-[16px] leading-snug md:block">{card.body}</p>}
          <p className="text-micro">{card.stat}</p>
        </div>
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border border-current transition-transform duration-[var(--dur)] ease-ref group-hover:translate-x-1 md:size-11"
        >
          <ArrowRight className="size-4 md:size-5" />
        </span>
      </div>
    </SmartLink>
  );
}

/** Horizontally scrolling, snapping card row with blob arrow buttons. */
export function JoinCarousel({ cards, label }: { cards: TripCard[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [canPrev, setPrev] = useState(false);
  const [canNext, setNext] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setPrev(el.scrollLeft > 8);
    setNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const li = el.querySelector("li");
    const step = li ? li.getBoundingClientRect().width + 29 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={ref}
        aria-label={label}
        className="no-scrollbar gutter flex snap-x snap-mandatory gap-[15px] overflow-x-auto overscroll-x-contain pb-2 scroll-px-[var(--gutter)] md:gap-[29px]"
      >
        {cards.map((card, i) => (
          <li
            key={card.id}
            className={cn(
              "w-[60vw] shrink-0 snap-start md:w-[34vw] md:max-w-[560px]",
              i % 2 === 0
                ? "h-[92vw] md:h-[45.3vw] md:max-h-[745px]"
                : "mt-[16vw] h-[76vw] md:mt-[8.6vw] md:h-[36.7vw] md:max-h-[604px]",
            )}
          >
            <Card card={card} />
          </li>
        ))}
        <li aria-hidden className="w-px shrink-0" />
      </ul>
      <div className="pointer-events-none absolute inset-y-0 right-[15px] flex items-center md:right-7">
        <BlobButton
          label={ui.nextCards}
          onClick={() => go(1)}
          disabled={!canNext}
          className={cn("pointer-events-auto transition-opacity", !canNext && "opacity-0")}
        >
          <ArrowRight className="size-6" />
        </BlobButton>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-[15px] flex items-center md:left-7">
        <BlobButton
          label={ui.previousCards}
          variant="ink"
          onClick={() => go(-1)}
          disabled={!canPrev}
          className={cn("pointer-events-auto transition-opacity", !canPrev && "opacity-0")}
        >
          <ArrowLeft className="size-6" />
        </BlobButton>
      </div>
    </div>
  );
}
