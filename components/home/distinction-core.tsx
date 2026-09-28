"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * The wireframe core that anchors the distinction grid: a geodesic mesh of
 * nodes joined to their nearest neighbours, turning slowly on its axis.
 *
 * The mesh is projected in plain SVG rather than WebGL — unlike the ecosystem
 * core — and the base geometry is computed once at module scope from a
 * Fibonacci sphere, so the first paint is identical on server and client. The
 * spin then mutates node and edge attributes directly from a rAF loop: no
 * React state per frame, and no re-render of the 79 elements involved.
 */

const VIEW = 220;
const CENTRE = VIEW / 2;
const RADIUS = 84;
const NODE_COUNT = 30;
/** Neighbours each node wires itself to. Three reads as a mesh, not a web. */
const LINKS_PER_NODE = 3;
/** Fixed tilt, applied after the spin so the poles never point straight at us. */
const TILT_X = 0.38;
/** Radians per second. One turn takes a little under a minute. */
const SPIN_SPEED = 0.12;

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Evenly spaced points on a unit sphere. */
const points: Vec3[] = Array.from({ length: NODE_COUNT }, (_, i) => {
  const t = (i + 0.5) / NODE_COUNT;
  const phi = Math.acos(1 - 2 * t);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;

  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.sin(phi) * Math.sin(theta),
    z: Math.cos(phi),
  };
});

/** Node pairs to wire, deduplicated — nearest neighbours in 3D, not on screen. */
const edges: [number, number][] = (() => {
  const seen = new Set<string>();
  const list: [number, number][] = [];

  points.forEach((a, i) => {
    points
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
      .filter((n) => n.j !== i)
      .sort((m, n) => m.d - n.d)
      .slice(0, LINKS_PER_NODE)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        list.push([i, j]);
      });
  });

  return list;
})();

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Spin about Y, then tilt about X, then drop the depth axis. Returns screen
 * coordinates plus a 0–1 depth, which is what drives size and opacity: nodes
 * at the back of the sphere sit small and faint, the front reads solid.
 */
function project(angle: number) {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const cosT = Math.cos(TILT_X);
  const sinT = Math.sin(TILT_X);

  return points.map((p) => {
    const x = p.x * cosA + p.z * sinA;
    const z = -p.x * sinA + p.z * cosA;
    const y2 = p.y * cosT - z * sinT;
    const z2 = p.y * sinT + z * cosT;

    return {
      cx: round(CENTRE + x * RADIUS),
      cy: round(CENTRE + y2 * RADIUS),
      depth: round((z2 + 1) / 2),
    };
  });
}

/** The pose rendered on the server and on the first client paint. */
const initial = project(0);

const nodeRadius = (depth: number) => round(1 + depth * 1.5);
const nodeOpacity = (depth: number) => round(0.22 + depth * 0.62);
const edgeWidth = (depth: number) => round(0.45 + depth * 0.55);
const edgeOpacity = (depth: number) => round(0.1 + depth * 0.4);

export function DistinctionCore({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (reduceMotion) return;

    const svg = svgRef.current;
    if (!svg) return;

    let frame = 0;
    let start = 0;
    /** Spin time accumulated so far, so leaving the viewport pauses, not resets. */
    let elapsed = 0;
    /** Only spin while the core is on screen — it sits mid-page. */
    let visible = false;

    const draw = (now: number) => {
      if (!start) start = now - elapsed;
      elapsed = now - start;
      const pose = project((elapsed / 1000) * SPIN_SPEED);

      pose.forEach((node, i) => {
        const circle = nodeRefs.current[i];
        if (!circle) return;
        circle.setAttribute("cx", String(node.cx));
        circle.setAttribute("cy", String(node.cy));
        circle.setAttribute("r", String(nodeRadius(node.depth)));
        circle.setAttribute("fill-opacity", String(nodeOpacity(node.depth)));
      });

      edges.forEach(([i, j], e) => {
        const line = lineRefs.current[e];
        if (!line) return;
        const a = pose[i];
        const b = pose[j];
        const depth = (a.depth + b.depth) / 2;
        line.setAttribute("x1", String(a.cx));
        line.setAttribute("y1", String(a.cy));
        line.setAttribute("x2", String(b.cx));
        line.setAttribute("y2", String(b.cy));
        line.setAttribute("stroke-width", String(edgeWidth(depth)));
        line.setAttribute("stroke-opacity", String(edgeOpacity(depth)));
      });

      frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === visible) return;
        visible = entry.isIntersecting;

        if (visible) {
          // Picked back up from the accumulated angle, not from zero.
          start = 0;
          frame = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(svg);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeLinecap="round">
        {edges.map(([i, j], e) => {
          const depth = (initial[i].depth + initial[j].depth) / 2;
          return (
            <line
              key={`${i}-${j}`}
              ref={(el) => {
                lineRefs.current[e] = el;
              }}
              x1={initial[i].cx}
              y1={initial[i].cy}
              x2={initial[j].cx}
              y2={initial[j].cy}
              strokeWidth={edgeWidth(depth)}
              strokeOpacity={edgeOpacity(depth)}
            />
          );
        })}
      </g>

      <g fill="currentColor">
        {initial.map((node, i) => (
          <circle
            key={i}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            cx={node.cx}
            cy={node.cy}
            r={nodeRadius(node.depth)}
            fillOpacity={nodeOpacity(node.depth)}
          />
        ))}
      </g>
    </svg>
  );
}
