import Link from "next/link";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/** Uses next/link for internal routes and a plain anchor for #hash, mailto: and external URLs. */
export function SmartLink({ href, ...rest }: Props) {
  if (/^(#|mailto:|tel:|https?:)/.test(href)) return <a href={href} {...rest} />;
  return <Link href={href} {...rest} />;
}
