/**
 * Shared intro state. The reel plays once per browser session; the hero's
 * entrance animation waits for it (see .hero-wait in globals.css).
 */
export const INTRO_KEY = "expedition.introSeen";

/** Runs before paint (in <head>) so returning visitors never see the reel flash. */
export const introScript = (enabled: boolean) =>
  enabled
    ? `try{if(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.intro="done"}}catch(e){}`
    : `document.documentElement.dataset.intro="done"`;
