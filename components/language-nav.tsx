import { brand, languages } from "@/site.config";
import { cn } from "@/lib/cn";

const current = brand.locale.split("-")[0];

export function LanguageNav({ className, linkClassName }: { className?: string; linkClassName?: string }) {
  return (
    <nav aria-label="Language" className={className}>
      <ul className="flex items-center gap-0.5">
        {languages.map((l, i) => {
          const active = l.code === current;
          return (
            <li key={l.code} className="flex items-center gap-0.5">
              {i > 0 && (
                <span aria-hidden className="opacity-50">
                  ·
                </span>
              )}
              <a
                href={l.href}
                hrefLang={l.code}
                lang={l.code}
                aria-current={active ? "true" : undefined}
                aria-label={l.name}
                className={cn(
                  "rounded-sm px-1 py-0.5",
                  active ? "font-medium underline decoration-2 underline-offset-[5px]" : "opacity-75 hover:opacity-100",
                  linkClassName,
                )}
              >
                {l.short}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
