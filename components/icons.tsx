type P = { className?: string };
const svg = { "aria-hidden": true, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" } as const;

export const ArrowDown = ({ className }: P) => (
  <svg {...svg} className={className} strokeWidth="2"><path d="M12 4v16M5 13l7 7 7-7" /></svg>
);
export const ArrowLeft = ({ className }: P) => (
  <svg {...svg} className={className} strokeWidth="2"><path d="M20 12H4M11 5l-7 7 7 7" /></svg>
);
export const ArrowRight = ({ className }: P) => (
  <svg {...svg} className={className} strokeWidth="2"><path d="M4 12h16M13 5l7 7-7 7" /></svg>
);
export const Close = ({ className }: P) => (
  <svg {...svg} className={className} strokeWidth="2"><path d="M5 5l14 14M19 5L5 19" /></svg>
);
export const Plus = ({ className }: P) => (
  <svg {...svg} className={className} strokeWidth="2"><path d="M12 4v16M4 12h16" /></svg>
);
