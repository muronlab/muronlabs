import { ImageResponse } from "next/og";

/**
 * Home-screen icon for iOS, which can't use SVG. Generated at build time from
 * the same design as app/icon.svg: the brand's gradient dot on a dark tile.
 * iOS rounds the corners itself, so the tile is square here.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121211",
          backgroundImage: "radial-gradient(circle at 50% 52%, rgba(250,127,216,0.42) 0%, rgba(250,127,216,0) 62%)",
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 9999,
            display: "flex",
            backgroundImage: "linear-gradient(135deg, #934bf0 0%, #fa7fd8 55%, #fa7465 100%)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 9999,
              backgroundImage: "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 48%)",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
