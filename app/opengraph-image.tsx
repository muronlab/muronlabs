import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/**
 * Default social-share card for every route (overridable by a deeper
 * `opengraph-image` file). Rendered at build time via `next/og` — flexbox and a
 * subset of CSS only. Mirrors the site: grey canvas, ink type, gradient tiles.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tiles: { top: number; left: number; w: number; h: number; bg: string }[] = [
  { top: 0, left: 0, w: 100, h: 18, bg: "linear-gradient(100deg,#b57cf5,#8f45ee)" },
  { top: 18, left: 0, w: 60, h: 18, bg: "linear-gradient(100deg,#9a5cf2,#fa7fd8 55%,#fa7465)" },
  { top: 36, left: 0, w: 30, h: 10, bg: "linear-gradient(100deg,#fa7465,#fb9a8a)" },
  { top: 46, left: 0, w: 45, h: 22, bg: "linear-gradient(100deg,#e6dcff,#a98bff)" },
  { top: 68, left: 0, w: 72, h: 8, bg: "linear-gradient(100deg,#fa7fd8,#fa7465)" },
  { top: 76, left: 0, w: 100, h: 24, bg: "linear-gradient(100deg,#9a5cf2,#fa7fd8 55%,#fa7465)" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f4f6f6",
          padding: 24,
          fontFamily: "sans-serif",
          color: "#121211",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#ffffff",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
              padding: 64,
            }}
          >
            {/* Logo: the μ mark + "muronlabs." */}
            <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 700, letterSpacing: "-0.04em" }}>
              <svg width="56" height="56" viewBox="0 0 240 240" style={{ marginRight: 14 }}>
                <defs>
                  <linearGradient id="og-mu" x1="30" y1="20" x2="210" y2="220" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#934BF0" />
                    <stop offset=".55" stopColor="#FA7FD8" />
                    <stop offset="1" stopColor="#FA7465" />
                  </linearGradient>
                </defs>
                <circle cx="120" cy="120" r="120" fill="url(#og-mu)" />
                <g fill="none" stroke="#FFFFFF" strokeWidth="28" strokeLinecap="butt" strokeLinejoin="round">
                  <path d="M70 60 V182" />
                  <path d="M70 104 A38 38 0 0 0 146 104 V60" />
                </g>
                <circle cx="176" cy="128" r="13" fill="#FFFFFF" />
              </svg>
              {siteConfig.wordmark.text}
              <span style={{ color: "#fa7465" }}>.</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 72, letterSpacing: "-0.045em", lineHeight: 1.05, maxWidth: 680 }}>
                {siteConfig.tagline}
              </div>
              <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#5c666d" }}>
                Software · AI & Data · Design
              </div>
            </div>
          </div>
          <div style={{ display: "flex", position: "relative", width: 300, margin: 12 }}>
            {tiles.map((t, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: `${t.top}%`,
                  left: `${t.left}%`,
                  width: `${t.w}%`,
                  height: `${t.h}%`,
                  backgroundImage: t.bg,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
