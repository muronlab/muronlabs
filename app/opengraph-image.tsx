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

const BRAND = "#70b494";

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
          background: "#5f9a8c",
          backgroundImage: `radial-gradient(700px circle at 12% 30%, #d19a7e, transparent 60%), radial-gradient(800px circle at 75% 15%, ${BRAND}, transparent 60%), radial-gradient(700px circle at 85% 95%, #cfa27f, transparent 60%)`,
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          [ Multidisciplinary Technology Studio ]
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {before}
            <span style={{ color: "#242422" }}>•</span>
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
            <span style={{ marginLeft: 16, opacity: 0.8 }}>Designing with soul.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "rgba(255,255,255,0.8)",
            borderTop: "1px solid rgba(255,255,255,0.4)",
            paddingTop: 32,
          }}
        >
          <span>Engineering · Agentic AI · Digital Artistry</span>
          <span style={{ color: "#ffffff" }}>muronlabs.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
