import { ImageResponse } from "next/og";
import { brand, colors } from "@/site.config";

export const alt = `${brand.name}: ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card: the two-line wordmark on the ink background. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: colors.ink,
          color: colors.paper,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.85, letterSpacing: "-0.035em", textTransform: "uppercase", fontWeight: 600 }}>
          <span style={{ paddingLeft: 100 }}>{brand.wordmark[0]}</span>
          <span>{brand.wordmark[1]}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {brand.monogram}
          </div>
          <span>{brand.tagline}</span>
        </div>
      </div>
    ),
    size,
  );
}
