# Expedition

A Tourground Launch Pad template for adventure travel brands: an opening film reel, a layered landscape hero with a giant two-line wordmark that sinks behind the land as you scroll, a staggered journey mosaic with full-screen stories, a planning carousel, people cards and a full footer.

Built with Next.js 16, Tailwind CSS 4 and Motion.

## Launch a new brand

1. **Copy the template.** Click *Use this template* on GitHub (or clone it) and name the repo after the brand.
2. **Install and run it.**

   ```bash
   npm install
   ```

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

3. **Edit `site.config.ts`.** It is the only file you need to touch. Work through it top to bottom:

   | Section | What to set |
   | --- | --- |
   | `brand` | Brand name, short name, monogram for the logo mark, the two wordmark lines, destination, tagline, description, live URL and locale |
   | `contact` | Email, postal address, footer note |
   | `colors` | Accent, highlight, ink, paper and the other roles. Hex values |
   | `fonts` | Any Google Fonts family with 400 and 500 weights, roman and italic |
   | `photos` | The hero photo and its `horizon` (percent from the top where the foreground starts; the wordmark disappears behind everything below it) |
   | `reel` | The opening clips (photos or muted `.mp4` videos), total length, or `enabled: false` to skip it |
   | `nav` | Header, phone bar, footer and legal links, plus the main call to action |
   | `currencies` | Currencies in the switcher and their rates. Prices are entered in the first one |
   | `journeys` | The eight mosaic tiles and the story each one opens |
   | `trip`, `people` | The carousel cards and the three people cards |
   | `ui` | Interface strings, if you need another language |

   Wrap words in `*asterisks*` to set them in italic, as the template does in headings.

4. **Use your own photos.** Put files in `public/photos/` and reference them as `/photos/name.jpg`, or paste any image URL. Unsplash links are resized automatically. Landscape photos with a clear foreground work best for the hero.

5. **Check and ship.**

   ```bash
   npm run build
   ```

   Deploy the repo to Vercel (or any Next.js host). The favicon, home-screen icon, social sharing image, page title, description, canonical URL and web manifest are generated from the config, and the footer reads `© [current year] [brand name]` automatically.

## Before you go live

- Replace every placeholder in `site.config.ts`: search the file for `Brand`, `Destination`, `example.com` and `Journey`.
- Set `brand.url` to the live domain so canonical and social links are correct.
- Point the `legal` links at real Privacy, Booking Terms and Cookie pages.
- Check the site on a phone. The layout is built never to scroll sideways, but very long wordmark lines are cropped at the screen edge, so keep each line to about six or seven characters.

## Project map

```
site.config.ts      All brand content, colours, fonts, photos and links
app/                Page, layout, metadata, icons, social image, manifest
app/globals.css     Type scale, spacing rhythm and motion (no brand values)
components/         Header, intro reel, hero, mosaic, carousel, cards, footer
```
