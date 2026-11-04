import { ImageResponse } from "next/og";

/**
 * Home-screen icon for iOS, which can't use SVG. Generated at build time: the
 * μ mark from app/icon.svg, filling the square (iOS rounds the corners).
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
          backgroundImage: "linear-gradient(135deg, #934bf0 0%, #fa7fd8 55%, #fa7465 100%)",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 240 240">
          <g fill="none" stroke="#FFFFFF" strokeWidth="28" strokeLinecap="butt" strokeLinejoin="round">
            <path d="M70 60 V182" />
            <path d="M70 104 A38 38 0 0 0 146 104 V60" />
          </g>
          <circle cx="176" cy="128" r="13" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
