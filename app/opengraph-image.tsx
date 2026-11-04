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
            <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 700, letterSpacing: "-0.04em" }}>
              {before}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  margin: "0 2px",
                  background: "linear-gradient(135deg,#934bf0,#fa7fd8 60%,#fa7465)",
                }}
              />
              {after}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 72, letterSpacing: "-0.045em", lineHeight: 1.05, maxWidth: 680 }}>
                {siteConfig.tagline}
              </div>
              <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#5c666d" }}>
                Software engineering · Agentic AI · Digital artistry
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
