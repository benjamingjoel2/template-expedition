import { brand, hero, journeys, nav, people, photos, trip } from "@/site.config";
import { ArrowLink } from "@/components/arrow-link";
import { ExpandCards } from "@/components/expand-cards";
import { Hero } from "@/components/hero";
import { IntroReel } from "@/components/intro-reel";
import { JoinCarousel } from "@/components/join-carousel";
import { Reveal } from "@/components/reveal";
import { RichText } from "@/components/rich-text";
import { StoryMosaic } from "@/components/story-mosaic";

export default function Home() {
  return (
    <>
      <IntroReel />

      <Hero
        image={photos.hero}
        lines={brand.wordmark}
        horizon={photos.horizon}
        lead={<RichText text={hero.lead} />}
        scrollTo="journeys"
        waitForIntro
      >
        <ArrowLink href={nav.cta.href} arrowClassName="text-highlight">
          {nav.cta.label}
        </ArrowLink>
      </Hero>

      <section id="journeys" data-theme="light" className="gutter pb-24 pt-[9.7vw] md:pb-[10vw]">
        <Reveal>
          <h2 className="text-h1 text-balance mx-auto max-w-[17ch] text-center">
            <RichText text={journeys.heading} />
          </h2>
        </Reveal>
        <div className="mt-14 md:mt-[7vw]">
          <StoryMosaic items={journeys.items} />
        </div>
        <div className="mt-14 flex justify-center md:mt-20">
          <ArrowLink href={journeys.more.href} className="text-[20px] md:text-[26px]" arrowClassName="text-accent">
            {journeys.more.label}
          </ArrowLink>
        </div>
      </section>

      <section id="your-trip" data-theme="light" className="bg-sand pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
        <Reveal className="gutter">
          <h2 className="text-h1 text-balance">
            <RichText text={trip.heading} />
          </h2>
        </Reveal>
        <div className="mt-10 md:mt-[5vw]">
          <JoinCarousel cards={trip.cards} label={trip.label} />
        </div>
      </section>

      <section id="people" data-theme="light" className="gutter pb-24 pt-[9.7vw] md:pb-[8vw]">
        <Reveal>
          <h2 className="text-h1 text-balance mx-auto max-w-[12ch] text-center">
            <RichText text={people.heading} />
          </h2>
        </Reveal>
        <div className="mt-14 md:mt-[8vw]">
          <ExpandCards cards={people.cards} />
        </div>
      </section>
    </>
  );
}
