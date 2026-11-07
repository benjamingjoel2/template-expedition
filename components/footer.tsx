import { brand, contact, nav } from "@/site.config";
import { ButtonLink } from "./buttons";
import { Logo } from "./logo";
import { SmartLink } from "./smart-link";
import { Year } from "./year";

export function Footer() {
  return (
    <footer
      id="contact"
      data-theme="light"
      className="border-t border-ink/10 bg-paper text-ink pb-[calc(var(--bar-h)+12px)] xl:pb-0"
    >
      <div className="gutter pt-14 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))] md:gap-8">
          <div className="flex min-w-0 flex-col items-start gap-5">
            <Logo />
            <p className="max-w-[30ch] text-[15px] leading-snug text-ink/75 md:text-[16px]">{contact.footerNote}</p>
            <address className="flex max-w-full flex-col gap-1.5 text-[14px] not-italic text-ink/75 md:text-[15px]">
              <a href={`mailto:${contact.email}`} className="break-words text-ink underline-offset-4 hover:underline">
                {contact.email}
              </a>
              <span className="max-w-[34ch]">{contact.address}</span>
            </address>
            <ButtonLink href={nav.cta.href} size="sm">
              {nav.cta.label}
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:contents">
            {nav.footer.map((col) => (
              <nav key={col.label} aria-label={col.label}>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <SmartLink
                        href={l.href}
                        className="text-[15px] underline-offset-4 hover:text-accent hover:underline md:text-[16px]"
                      >
                        {l.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-ink/15 py-5 text-[13px] text-ink/75 md:mt-16 md:flex-row md:flex-wrap md:items-center md:gap-x-6">
          <span>
            © <Year /> {brand.name}
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.legal.map((l) => (
              <SmartLink key={l.label} href={l.href} className="underline-offset-4 hover:underline">
                {l.label}
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
