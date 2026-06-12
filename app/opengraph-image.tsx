import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/**
 * Default social-share card for every route (overridable by a deeper
 * `opengraph-image` file). Rendered at build time via `next/og` — flexbox and a
 * subset of CSS only. Mirrors the site's dark-on-brand wordmark language.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND = "#7c5cff";

export default function OpengraphImage() {
  const { text, dotIndex } = siteConfig.wordmark;
  const before = text.slice(0, dotIndex);
  const after = text.slice(dotIndex + 1);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          backgroundImage: `radial-gradient(900px circle at 80% -10%, ${BRAND}33, transparent 55%)`,
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#a3a3a3",
          }}
        >
          [ Multidisciplinary Technology Studio ]
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {before}
            <span style={{ color: BRAND }}>•</span>
            {after}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Engineering with precision.
            <span style={{ color: BRAND, marginLeft: 16 }}>Designing with soul.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#a3a3a3",
            borderTop: "1px solid #262626",
            paddingTop: 32,
          }}
        >
          <span>Engineering · Agentic AI · Digital Artistry</span>
          <span style={{ color: "#fafafa" }}>muronlabs.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
