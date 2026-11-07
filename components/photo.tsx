import Image from "next/image";
import { cn } from "@/lib/cn";

export function Photo({
  src,
  alt = "",
  sizes,
  className,
  priority,
  quality = 75,
}: {
  src: string;
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={quality}
      preload={priority}
      fetchPriority={priority ? "high" : undefined}
      className={cn("object-cover", className)}
    />
  );
}
