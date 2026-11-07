"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { ui } from "@/site.config";
import { cn } from "@/lib/cn";
import { BlobButton } from "./buttons";
import { ArrowDown } from "./icons";
import { Photo } from "./photo";

/**
 * Layered landscape hero. The photo is drawn twice: behind the wordmark, and
 * again in front of it, masked to everything below `horizon`. On scroll the
 * wordmark travels faster than the land, so it sinks behind the foreground.
 */
export function Hero({
  image,
  lines,
  lead,
  children,
  horizon = 66,
  scrollTo,
  waitForIntro = false,
}: {
  image: { src: string; alt: string };
  lines: [string, string];
  lead?: ReactNode;
  children?: ReactNode;
  horizon?: number;
  scrollTo?: string;
  waitForIntro?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Progress from the hero's top reaching the viewport top (0) to its bottom
  // reaching it (1). Derived from page scroll in JS, because Motion's
  // hardware-accelerated view timelines map this offset to the wrong range.
  const height = useRef(1);
  useEffect(() => {
    const measure = () => {
      if (ref.current) height.current = ref.current.offsetHeight || 1;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (y) => {
    const top = ref.current ? ref.current.offsetTop : 0;
    return Math.min(1, Math.max(0, (y - top) / height.current));
  });
  const landY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "60%"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const leadY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const mask = `linear-gradient(to bottom, transparent ${horizon - 3}%, black ${horizon + 2}%)`;

  const layer = (
    <>
      <Photo src={image.src} sizes="100vw" priority quality={60} className="scale-110" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/70" />
    </>
  );
  const rise = (i: number) => ({
    className: cn("hero-rise", waitForIntro && "hero-wait"),
    style: { "--d": `${0.1 + 0.12 * i}s` } as CSSProperties,
  });

  return (
    <section
      ref={ref}
      data-theme="dark"
      className="relative isolate overflow-hidden bg-ink text-paper h-[100svh] min-h-[560px]"
    >
      <motion.div aria-hidden className="absolute inset-0 -z-20" style={{ y: landY }}>
        {layer}
      </motion.div>

      <motion.div
        className="gutter relative -z-10 pt-[calc(var(--header-h)+14svh)] md:pt-[calc(var(--header-h)+10svh)]"
        style={{ y: wordY, opacity: wordOpacity }}
      >
        <h1 className="text-display">
          <span {...rise(0)}>
            <span className="block pl-[8vw] md:pl-[8.7vw]">{lines[0]}</span>
          </span>
          <span {...rise(1)}>
            <span className="block">{lines[1]}</span>
          </span>
        </h1>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{ y: landY, maskImage: mask, WebkitMaskImage: mask }}
      >
        {layer}
      </motion.div>

      {(lead || children) && (
        <motion.div
          className="gutter absolute inset-x-0 z-10 md:left-[59%] md:right-auto md:w-[min(32rem,34vw)] md:px-0 bottom-[calc(var(--bar-h)+96px)] md:bottom-[15svh]"
          style={{ y: leadY }}
        >
          <div {...rise(2)}>
            {lead && <div className="text-lead text-pretty">{lead}</div>}
            {children && <div className="mt-7 md:mt-11">{children}</div>}
          </div>
        </motion.div>
      )}

      {scrollTo && (
        <div className="absolute inset-x-0 bottom-[calc(var(--bar-h)+24px)] z-10 flex justify-center xl:bottom-[5svh]">
          <div {...rise(4)}>
            <BlobButton
              label={ui.scrollNext}
              onClick={() =>
                document.getElementById(scrollTo)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
              }
            >
              <ArrowDown className="size-6 animate-[nudge_2.4s_ease-in-out_infinite]" />
            </BlobButton>
          </div>
        </div>
      )}
    </section>
  );
}
