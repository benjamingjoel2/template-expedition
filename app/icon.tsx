import { ImageResponse } from "next/og";
import { brand, colors } from "@/site.config";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the round monogram from site.config.ts. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: colors.accent,
          color: colors.paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: brand.monogram.length > 2 ? 22 : 28,
          fontWeight: 600,
          letterSpacing: "-0.06em",
        }}
      >
        {brand.monogram}
      </div>
    ),
    size,
  );
}
