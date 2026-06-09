/**
 * Decorative iridescent "disc torus" — a ring of overlapping metallic blades.
 * Pure CSS approximation of a 3D render: each blade is a tilted gradient
 * ellipse rotated around the centre. Purely ornamental, so it's aria-hidden.
 */

const BLADE_COUNT = 46;
const RADIUS = 150; // px from centre to each blade

export function DiscRing({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ position: "relative", width: 460, height: 460 }}
    >
      {/* Soft purple glow behind the ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle at 50% 50%, rgba(150,110,255,0.35) 0%, transparent 60%)",
          filter: "blur(30px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: "rotate(-12deg)",
        }}
      >
        {Array.from({ length: BLADE_COUNT }).map((_, i) => {
          // Start at the bottom so the one unavoidable fan seam (where the
          // top-most blade meets the bottom-most one) falls behind the glow
          // instead of at the top — the ring then reads as continuous.
          const angle = (360 / BLADE_COUNT) * i + 180;
          // Alternate the highlight so the metal reads as faceted.
          const light = i % 2 === 0 ? "#efe9ff" : "#c9b6ef";
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 30,
                height: 124,
                marginLeft: -15,
                marginTop: -62,
                borderRadius: "9999px",
                transform: `rotate(${angle}deg) translateY(-${RADIUS}px) rotate(-26deg)`,
                background: `linear-gradient(135deg, #1a1330 0%, #4a2f7a 32%, #8a6fd6 62%, ${light} 100%)`,
                // Symmetric (non-directional) shadow so blade overlap order
                // doesn't reveal a hard edge at the seam.
                boxShadow:
                  "inset 1px 1px 2px rgba(255,255,255,0.45), 0 0 6px rgba(0,0,0,0.45)",
              }}
            />
          );
        })}
      </div>
      {/* Centre mark sitting in the disc's hole */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: 76,
            lineHeight: 1,
            fontWeight: 700,
            color: "#efe9ff",
          }}
        >
          μ
        </span>
      </div>
    </div>
  );
}