import { ImageResponse } from "next/og";
import { brand, colors } from "@/site.config";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: colors.accent,
          color: colors.paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: brand.monogram.length > 2 ? 60 : 76,
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
