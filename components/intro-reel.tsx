"use client";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { brand, reel, ui } from "@/site.config";
import { INTRO_KEY } from "./intro";
import { Photo } from "./photo";

const clips = reel.clips;
let finished = false;
const listeners = new Set<() => void>();

function finish() {
  finished = true;
  document.documentElement.dataset.intro = "done";
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {}
  listeners.forEach((l) => l());
}

/** Full-screen opening reel: clips crossfade with a slow zoom, then the hero rises. */
export function IntroReel() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => finished || document.documentElement.dataset.intro === "done",
    () => false,
  );
  const skip = useCallback(() => {
    setVisible(false);
    finish();
  }, []);

  useEffect(() => {
    if (!reel.enabled || clips.length === 0 || document.documentElement.dataset.intro === "done") {
      finish();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const step = reel.durationMs / clips.length;
    const interval = window.setInterval(() => setIndex((i) => Math.min(i + 1, clips.length - 1)), step);
    const timeout = window.setTimeout(skip, reel.durationMs);
    const onKey = (e: KeyboardEvent) => {
      if (["Escape", "Enter", " ", "ArrowDown"].includes(e.key)) skip();
    };
    window.addEventListener("keydown", onKey);
    ref.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [skip]);

  if (!reel.enabled || clips.length === 0) return null;

  return (
    <AnimatePresence>
      {visible && !done && (
        <motion.div
          ref={ref}
          data-intro-overlay
          data-chrome
          data-theme="dark"
          role="button"
          tabIndex={0}
          aria-label={ui.skipAria}
          onClick={skip}
          className="fixed inset-0 z-[90] cursor-pointer overflow-hidden bg-ink text-paper outline-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {clips.map((clip, i) => (
            <motion.div
              key={clip.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1.08 : 1 }}
              transition={{
                opacity: { duration: 1.2 },
                scale: { duration: reel.durationMs / clips.length / 1000 + 1.5, ease: "linear" },
              }}
            >
              {i <= index + 1 &&
                (clip.type === "video" ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={clip.src}
                    poster={clip.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload={i === 0 ? "auto" : "metadata"}
                  />
                ) : (
                  <Photo src={clip.src} sizes="100vw" priority={i === 0} quality={60} />
                ))}
            </motion.div>
          ))}
          <div aria-hidden className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-x-0 top-[47%] flex flex-col items-center gap-3">
            <span className="text-[16px] font-medium tracking-[-0.03em] md:text-[18px]">{ui.skip}</span>
            <span className="relative block h-[2px] w-[35px] overflow-hidden bg-paper/30">
              <motion.span
                className="absolute inset-y-0 left-0 bg-paper"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reel.durationMs / 1000, ease: "linear" }}
              />
            </span>
          </div>
          <p className="absolute bottom-6 left-[15px] max-w-[60vw] text-[12px] tracking-[-0.01em] text-paper/70 md:left-7 md:text-[13px]">
            {brand.tagline}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
