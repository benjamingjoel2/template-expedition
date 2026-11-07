/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EXPEDITION · brand config
 *  Everything brand-specific lives in this one file. Change it, rebuild, ship.
 *  Text wrapped in *asterisks* is set in italic.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Brand ───────────────────────────────────────────────────────────────── */

const brandName = "Brand Name";
const destination = "Destination";

export const brand = {
  /** Used in the header, footer (© [Year] [Brand name]), meta tags and manifest. */
  name: brandName,
  /** Short name for the home-screen icon / web manifest. */
  shortName: "Brand",
  /** Letters inside the round logo mark (keep to 2–4 characters). */
  monogram: "BN",
  /** The giant two-line wordmark in the hero. Shown in uppercase. */
  wordmark: ["Brand", "& Name"] as [string, string],
  /** The place you sell. Used across the copy below. */
  destination,
  /** One line. Appears in the hero, the opening reel and the menu. */
  tagline: "Your tagline goes here.",
  /** Search / social description. */
  description: `Small-group and private journeys across ${destination}, planned by one dedicated specialist and led by local guides.`,
  /** Public URL of the site, no trailing slash. Used for canonical and social tags. */
  url: "https://www.example.com",
  /** BCP-47 language tag for <html lang>. */
  locale: "en-GB",
};

/* ── Contact ─────────────────────────────────────────────────────────────── */

export const contact = {
  email: "hello@example.com",
  address: "Street address, Town, Postcode, Country",
  /** Footer line under the logo. */
  footerNote: `Planned with local families, guides and drivers across ${destination}`,
};

/* ── Colours ─────────────────────────────────────────────────────────────── */
/* Roles, not names: swap any hex value and the whole site follows.           */

export const colors = {
  /** Buttons, logo mark, primary call to action. */
  accent: "#b3261e",
  accentDeep: "#8f1d17",
  /** Arrows on dark backgrounds, text selection, prices. */
  highlight: "#d9a441",
  highlightTint: "#f1e2c2",
  /** Keyboard focus ring on light backgrounds. */
  focus: "#2f6fb5",
  /** Dark surfaces and body text. */
  ink: "#1c1d1f",
  inkSoft: "#2a2b2e",
  /** Page background and text on dark surfaces. */
  paper: "#f7f4ee",
  /** Alternate section background. */
  sand: "#efe7da",
  /** Card fallback behind photos. */
  stone: "#8a857c",
  /** Image placeholder while journey photos load. */
  tint: "#dfe5d5",
};

/* ── Fonts ───────────────────────────────────────────────────────────────── */
/* Any Google Fonts family with 400 and 500 weights (roman + italic).         */

export const fonts = {
  sans: "Inter Tight",
  /** Google Fonts axis query, appended after the family name. */
  googleQuery: "ital,wght@0,400;0,500;1,400;1,500",
  fallback: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

/* ── Photos ──────────────────────────────────────────────────────────────── */
/* Any absolute URL or a file in /public (e.g. "/photos/hero.jpg").           */
/* Unsplash URLs are resized automatically; anything else is served as is.    */

export type Photo = { src: string; alt: string };

const u = (id: string, alt: string): Photo => ({
  src: `https://images.unsplash.com/photo-${id}`,
  alt,
});

export const photos = {
  /**
   * The layered landscape hero. The same photo is drawn twice: once behind the
   * wordmark and once in front of it, masked below `horizon` (percent from
   * top), so the wordmark slips behind the foreground as you scroll.
   */
  hero: u("1464822759023-fed622ff2c3b", "Mountain valley with pine forest in the foreground"),
  horizon: 66,
};

/* ── Opening reel ────────────────────────────────────────────────────────── */
/* Plays once per visit, before the hero. Clips crossfade with a slow zoom.   */
/* A clip is a photo ({ type: "image" }) or a muted video ({ type: "video" }). */

export type ReelClip =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

export const reel = {
  enabled: true,
  /** Total length of the reel in milliseconds, shared evenly between clips. */
  durationMs: 9000,
  clips: [
    { type: "image", src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429" },
    { type: "image", src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35" },
    { type: "image", src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071" },
    { type: "image", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba" },
  ] as ReelClip[],
};

/* ── Navigation ──────────────────────────────────────────────────────────── */

export type NavLink = { label: string; href: string };

export const nav = {
  /** Header (desktop) and menu sheet (mobile). */
  main: [
    { label: "Journeys", href: "#journeys" },
    { label: "Plan", href: "#your-trip" },
    { label: "People", href: "#people" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],
  /** The three shortcuts in the phone bar, next to "Menu". */
  quick: [
    { label: "Journeys", href: "#journeys" },
    { label: "Plan", href: "#your-trip" },
    { label: "People", href: "#people" },
  ] as NavLink[],
  /** Footer link columns. */
  footer: [
    {
      label: "Journeys",
      links: [
        { label: "All journeys", href: "#journeys" },
        { label: "Plan a trip", href: "#your-trip" },
      ],
    },
    {
      label: "About",
      links: [
        { label: "Our people", href: "#people" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      label: "Help",
      links: [{ label: "Email us", href: `mailto:${contact.email}` }],
    },
  ] as { label: string; links: NavLink[] }[],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Booking Terms", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ] as NavLink[],
  /** The call-to-action button in the header, hero, menu and footer. */
  cta: { label: "Plan my journey", href: `mailto:${contact.email}` } as NavLink,
};

/** Language links in the header. Add entries if you publish translations. */
export const languages = [{ code: "en", short: "EN", name: "English", href: "/" }];

/* ── Currencies ──────────────────────────────────────────────────────────── */
/* Prices below are entered in the first currency; the rest are converted.    */

export const currencies = [
  { code: "USD", label: "US dollar", symbol: "$", rate: 1, roundTo: 10, locale: "en-US" },
  { code: "EUR", label: "Euro", symbol: "€", rate: 0.92, roundTo: 10, locale: "de-DE" },
  { code: "GBP", label: "British pound", symbol: "£", rate: 0.79, roundTo: 10, locale: "en-GB" },
];

/* ── Hero ────────────────────────────────────────────────────────────────── */

export const hero = {
  lead: `*${brand.tagline}* Small-group and private journeys across ${destination}, planned by one dedicated specialist and led by local guides.`,
};

/* ── Journeys ────────────────────────────────────────────────────────────── */
/* The staggered photo mosaic. Each journey opens a full-screen story.        */

export type Journey = {
  id: string;
  title: string;
  image: Photo;
  story: {
    label: string;
    text: string;
    facts: string[];
    priceFrom?: number;
    links: NavLink[];
  };
};

const journeyLinks: NavLink[] = [
  { label: "Ask about this journey", href: `mailto:${contact.email}` },
  nav.cta,
];

export const journeys = {
  heading: `*Journeys* across ${destination}`,
  more: { label: "Ask about all our journeys", href: `mailto:${contact.email}` } as NavLink,
  items: [
    {
      id: "journey-one",
      title: "Journey one",
      image: u("1500530855697-b586d89ba3ee", "A road winding through red rock canyons"),
      story: {
        label: "Region · Area",
        text: "Describe the first morning of this journey in two or three sentences, the moment a traveller *realises how far they have come*, and what they will remember most.",
        facts: ["14 days", "Moderate", "Spring & Autumn"],
        priceFrom: 4250,
        links: journeyLinks,
      },
    },
    {
      id: "journey-two",
      title: "Journey two",
      image: u("1501785888041-af3ef285b470", "A small boat on a turquoise mountain lake"),
      story: {
        label: "Region",
        text: "A short, vivid story about this journey. Keep it to the senses: *what you see, hear and taste*, and who you meet along the way.",
        facts: ["10 days", "Easy", "Summer"],
        priceFrom: 3600,
        links: journeyLinks,
      },
    },
    {
      id: "journey-three",
      title: "Journey three",
      image: u("1454496522488-7a8e488e8606", "A snow-covered peak above a glacier valley"),
      story: {
        label: "Region",
        text: "Tell the story of this journey in a few lines. *Lead with the landscape*, then the people, then the pace.",
        facts: ["12 days", "Challenging", "Summer"],
        priceFrom: 4900,
        links: journeyLinks,
      },
    },
    {
      id: "journey-four",
      title: "Journey four",
      image: u("1516426122078-c23e76319801", "A safari vehicle in tall grass at sunset"),
      story: {
        label: "Region",
        text: "Two or three sentences about this journey, written for one reader. *Make them want to be there.*",
        facts: ["9 days", "Easy", "Autumn"],
        priceFrom: 3950,
        links: journeyLinks,
      },
    },
    {
      id: "journey-five",
      title: "Journey five",
      image: u("1530789253388-582c481c54b0", "Travellers watching hot-air balloons at dawn"),
      story: {
        label: "Region · Area",
        text: "Time this journey with a festival or season, and say *why that moment matters* to the people who live there.",
        facts: ["8 days", "Easy", "Summer"],
        priceFrom: 3200,
        links: journeyLinks,
      },
    },
    {
      id: "journey-six",
      title: "Journey six",
      image: u("1551632811-561732d1e306", "Two hikers on a trail below snowy mountains"),
      story: {
        label: "Region",
        text: "A slow journey on foot or horseback. *Days measured in valleys*, nights under a sky full of stars.",
        facts: ["11 days", "Moderate", "Spring & Summer"],
        priceFrom: 3800,
        links: journeyLinks,
      },
    },
    {
      id: "journey-seven",
      title: "Journey seven",
      image: u("1470071459604-3b5ec3a7fe05", "Green cliffs and a river valley under clouds"),
      story: {
        label: "Region",
        text: "Describe the high point of this journey, *literally or otherwise*, and what it takes to get there.",
        facts: ["13 days", "Challenging", "Summer"],
        priceFrom: 4600,
        links: journeyLinks,
      },
    },
    {
      id: "journey-eight",
      title: "Journey eight",
      image: u("1476514525535-07fb3b4ae5f1", "The bow of a wooden boat on a mountain lake"),
      story: {
        label: "Region · Area",
        text: "An off-season journey. Say *what changes* when the crowds leave, and why it is worth the cold or the heat.",
        facts: ["7 days", "Moderate", "Winter"],
        priceFrom: 2900,
        links: journeyLinks,
      },
    },
  ] as Journey[],
};

/* ── "Now it's your trip" carousel ───────────────────────────────────────── */
/* First card is a solid accent card; the rest are photo cards.               */

export type TripCard = {
  id: string;
  title: string;
  href: string;
  stat: string;
  body?: string;
  image?: Photo;
};

export const trip = {
  heading: "Now it's *your* trip",
  label: "Ways to start planning",
  cards: [
    {
      id: "plan",
      title: "*Plan* your journey in five steps…",
      href: nav.cta.href,
      body: "Tell us when, where and how you like to travel. Your specialist replies within two working days.",
      stat: "One specialist, from first message to flight home",
    },
    {
      id: "stay",
      title: "*Stay* with local families…",
      href: "#people",
      stat: "10 ways to live like a local",
      image: u("1504280390367-361c6d9f38f4", "The view out of a canvas tent onto a forest"),
    },
    {
      id: "time",
      title: "*Time* it with a festival…",
      href: "#journeys",
      stat: "5 festivals through the year",
      image: u("1523805009345-7448845a9e53", "A giraffe beside an acacia tree at dusk"),
    },
    {
      id: "choose",
      title: "*Choose* your corner of the country…",
      href: "#journeys",
      stat: "6 regions to explore",
      image: u("1506905925346-21bda4d32df4", "Mountain peaks rising above a sea of clouds"),
    },
    {
      id: "travel",
      title: "*Travel* lightly…",
      href: "#people",
      stat: "How we work with local communities",
      image: u("1501555088652-021faa106b9b", "A hiker crossing an alpine meadow"),
    },
    {
      id: "pack",
      title: "*Pack* for four seasons in a day…",
      href: "#contact",
      stat: "Kit lists for every season",
      image: u("1488646953014-85cb44e25828", "A map, notebook, camera and backpack laid out"),
    },
  ] as TripCard[],
};

/* ── People ──────────────────────────────────────────────────────────────── */

export const people = {
  heading: "… and *meet* the people who make it",
  cards: [
    {
      id: "guides",
      eyebrow: "On the ground",
      title: "Local guides and drivers",
      body: "Guides who grew up in the regions you travel through and drivers who know every road. They set the pace with you, not for you.",
      link: { label: "About us", href: "#contact" },
      image: u("1478131143081-80f7f84ca84d", "Friends gathered around a campfire at night"),
    },
    {
      id: "specialist",
      eyebrow: "From the first message",
      title: "One dedicated specialist",
      body: "Your specialist plans your trip from the first message to the day you fly home: routes, stays, dietary needs and every transfer. One person, one thread.",
      link: { label: "How we plan", href: "#your-trip" },
      image: u("1527631746610-bca00a040d60", "A traveller with a backpack walking down a narrow street"),
    },
    {
      id: "hosts",
      eyebrow: "Where you stay",
      title: "Host families and small camps",
      body: "You stay with families and in small camps we know personally, paid fairly and booked with respect for local life.",
      link: { label: "Get in touch", href: "#contact" },
      image: u("1439066615861-d1af74d74000", "A wooden jetty on a calm forest lake"),
    },
  ] as {
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    link?: NavLink;
    image: Photo;
  }[],
};

/* ── Interface strings ───────────────────────────────────────────────────── */

export const ui = {
  skip: "Click to skip",
  skipAria: "Intro film. Press to skip",
  scrollNext: "Scroll to the next section",
  menu: "Menu",
  closeMenu: "Close menu",
  closeStory: "Close story",
  openStory: "open story",
  nextCards: "Next cards",
  previousCards: "Previous cards",
  showDetails: "Show details",
  hideDetails: "Hide details",
  currency: "Currency",
  changeCurrency: "Change currency",
  chooseCurrency: "Choose currency",
  fromPrice: "From {price} per person",
  skipToContent: "Skip to content",
};
