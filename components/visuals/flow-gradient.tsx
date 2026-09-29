"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Colour sets for the flow field, as RGB triples (0–1). `a`–`d` are the
 * body colours; `e` is the thin seam where the folds meet. `flow` is the
 * hero palette; `circle` leans green for the orb motifs; `dev`, `ai` and
 * `arts` give each division its own field.
 */
const PALETTES = {
  flow: {
    a: [0.36, 0.58, 0.53], // teal
    b: [0.38, 0.68, 0.5], // green
    c: [0.82, 0.6, 0.49], // peach
    d: [0.77, 0.7, 0.48], // sand
    e: [0.45, 0.76, 0.5],
  },
  circle: {
    a: [0.36, 0.6, 0.5],
    b: [0.44, 0.71, 0.58],
    c: [0.62, 0.74, 0.55],
    d: [0.84, 0.66, 0.56],
    e: [0.45, 0.76, 0.5],
  },
  dev: {
    a: [0.17, 0.18, 0.17], // ink
    b: [0.33, 0.39, 0.37], // slate sage
    c: [0.62, 0.64, 0.6], // stone
    d: [0.44, 0.71, 0.58], // green
    e: [0.8, 0.82, 0.78],
  },
  ai: {
    a: [0.22, 0.47, 0.44], // deep teal
    b: [0.36, 0.58, 0.46], // green
    c: [0.52, 0.78, 0.66], // mint
    d: [0.78, 0.74, 0.5], // sand
    e: [0.62, 0.9, 0.66],
  },
  hero: {
    a: [0.24, 0.55, 0.5], // teal
    b: [0.4, 0.67, 0.5], // green
    c: [0.67, 0.69, 0.47], // olive
    d: [0.85, 0.6, 0.53], // peach
    e: [0.56, 0.86, 0.64],
  },
  arts: {
    a: [0.78, 0.46, 0.52], // rose
    b: [0.96, 0.65, 0.69], // blush
    c: [0.97, 0.78, 0.62], // apricot
    d: [0.62, 0.44, 0.6], // plum
    e: [1.0, 0.86, 0.84],
  },
} as const;

export type FlowPalette = keyof typeof PALETTES;

/** CSS stand-in painted under the canvas — also the no-WebGL fallback. */
const FALLBACK: Record<FlowPalette, string> = {
  flow: "radial-gradient(60% 80% at 15% 30%, #cfa27f 0%, transparent 60%), radial-gradient(50% 70% at 70% 20%, #5fae7e 0%, transparent 65%), radial-gradient(60% 60% at 80% 85%, #d19a7e 0%, transparent 60%), linear-gradient(135deg, #6a9a8c, #5fae7e 55%, #b8b07c)",
  circle: "radial-gradient(70% 70% at 30% 30%, #9fbd8c 0%, transparent 65%), linear-gradient(135deg, #5c9376, #70b494)",
  dev: "radial-gradient(60% 60% at 70% 30%, #9ea39a 0%, transparent 60%), linear-gradient(160deg, #2b2e2c, #55635e 60%, #70b494)",
  ai: "radial-gradient(60% 60% at 30% 30%, #85c7a8 0%, transparent 60%), linear-gradient(160deg, #387870, #5c9476 60%, #c7bd80)",
  hero: "radial-gradient(60% 70% at 15% 85%, #d99a87 0%, transparent 60%), radial-gradient(60% 60% at 30% 20%, #abb07a 0%, transparent 60%), linear-gradient(150deg, #9fae7c, #3f9c8c 55%, #66ab82)",
  arts: "radial-gradient(60% 60% at 30% 70%, #f7c79e 0%, transparent 60%), linear-gradient(160deg, #c77585, #f5a6af 60%, #9e7099)",
};

/**
 * The shader clock swings back and forth within ±TIME_SWING seconds instead of
 * growing forever. Noise inputs scale with time, and past a few minutes the
 * float precision runs out: the field turns faceted and streaky (the liquid
 * mode's slope lighting magnifies it most). A sine keeps the motion smooth —
 * the field eases to a stop and drifts back, once every ~12 minutes.
 */
const TIME_SWING = 120;

const LIQUID_FALLBACK =
  "radial-gradient(120% 90% at 55% 115%, transparent 52%, #2f9c84 58%, #5fb98a 63%, transparent 70%), linear-gradient(120deg, #c8b186, #d6a187 55%, #cda585)";

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform vec3 uD;
uniform vec3 uE;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = r * p * 2.0 + 0.17;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / min(uRes.x, uRes.y);
  p *= 0.8;
  p += (uPointer - 0.5) * 0.06;

  float t = uTime * 0.035;

  // Two rounds of domain warping give the long, folding ribbons.
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(fbm(p + 2.8 * q + vec2(1.7, 9.2) + 0.6 * t),
                fbm(p + 2.8 * q + vec2(8.3, 2.8) - 0.4 * t));
  float n = fbm(p + 1.8 * r);

  vec3 col = mix(uA, uB, smoothstep(0.3, 0.62, n));
  col = mix(col, uC, smoothstep(0.4, 0.56, r.x));
  col = mix(col, uD, smoothstep(0.42, 0.62, q.y) * 0.5);

  // Thin iridescent seams where the fields fold over each other.
  float seam = 1.0 - smoothstep(0.0, 0.02, abs(r.x - 0.46));
  col = mix(col, uE, seam * 0.6);

  // Soft vignette for depth; no grain, so the field stays silky smooth.
  col *= 0.92 + 0.12 * smoothstep(1.2, 0.2, length(uv - 0.5));

  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * "Liquid" mode — the hero field: glossy silk that keeps reshaping (double
 * domain warp) in peach, tan, olive, green and teal. The slope of the field
 * lights the folds, splits the colour ramp per channel for chromatic edges,
 * and adds a thin rainbow sheen on the steepest folds.
 */
const FRAG_LIQUID = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
float hash(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 r=mat2(.8,.6,-.6,.8);for(int i=0;i<3;i++){v+=a*noise(p);p=r*p*2.+.17;a*=.5;}return v;}
float field(vec2 p,float t){
  vec2 q=vec2(fbm(p+vec2(0.,t)),fbm(p+vec2(5.2,1.3)-t*.8));
  vec2 r=vec2(fbm(p+1.7*q+vec2(1.7,9.2)+t*.6),fbm(p+1.7*q+vec2(8.3,2.8)-t*.5));
  return clamp((fbm(p+1.5*r)-.5)*2.3+.5,0.,1.);
}
vec3 ramp(float f){
  vec3 tan=vec3(.80,.69,.52), peach=vec3(.86,.60,.52), olive=vec3(.60,.66,.46);
  vec3 green=vec3(.33,.70,.52), teal=vec3(.14,.56,.52);
  vec3 c=mix(peach,tan,smoothstep(.2,.36,f));
  c=mix(c,olive,smoothstep(.4,.5,f));
  c=mix(c,green,smoothstep(.5,.6,f));
  c=mix(c,teal,smoothstep(.62,.8,f));
  return c;
}
void main(){
  vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y*.55;
  p+=(uPointer-.5)*.04;
  float t=uTime*.09;
  float e=.004;
  float f=field(p,t);
  float fx=field(p+vec2(e,0.),t), fy=field(p+vec2(0.,e),t);
  vec2 g=vec2(fx-f,fy-f)/e;             // slope of the silk
  vec3 n=normalize(vec3(-g*.18,1.));
  vec3 L=normalize(vec3(-.4,.6,.7));
  float diff=dot(n,L);
  float spec=pow(max(dot(reflect(-L,n),vec3(0,0,1)),0.),24.);
  // chromatic dispersion: sample the colour ramp shifted per channel along the slope
  float k=length(g);
  vec3 col=vec3(ramp(f+.012*k).r, ramp(f).g, ramp(f-.012*k).b);
  col*=.82+.3*diff;
  col+=spec*vec3(1.,.95,.85)*.35;
  // thin rainbow sheen on steep folds
  vec3 rb=.5+.5*cos(6.2831*(f*2.5+vec3(0.,.33,.67)));
  col=mix(col,rb*.7+.35,smoothstep(1.5,4.,k)*.22);
  gl_FragColor=vec4(col,1.);
}
`;

interface FlowGradientProps {
  palette?: FlowPalette;
  className?: string;
  /** Fraction of device pixels rendered. The field is soft, so half is plenty. */
  resolution?: number;
  /** Animation speed multiplier. */
  speed?: number;
  /** Nudge the field toward the pointer. */
  interactive?: boolean;
  /** "flow" = folding ribbons in `palette`; "liquid" = the hero's reshaping silk. */
  mode?: "flow" | "liquid";
}

/**
 * Living, slowly folding gradient field — the site's signature surface. A tiny
 * raw-WebGL fragment shader (no dependencies), rendered at reduced resolution
 * and paused whenever its `[data-flow-root]` ancestor (or parent) is offscreen,
 * so several instances on one page stay cheap. Reduced motion renders a single
 * still frame; without WebGL the CSS fallback underneath shows instead.
 */
export function FlowGradient({
  palette = "flow",
  className,
  resolution = 0.5,
  speed = 1,
  interactive = true,
  mode = "flow",
}: FlowGradientProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // A fresh canvas per mount: the old one's context is released on cleanup,
    // and a released context can't be reused (React dev remounts effects).
    const canvas = document.createElement("canvas");
    canvas.className = "block size-full opacity-0 transition-opacity duration-700";
    canvas.style.filter = "blur(0.5px)";
    host.appendChild(canvas);
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false, powerPreference: "low-power" });
    if (!gl) {
      canvas.remove();
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, mode === "liquid" ? FRAG_LIQUID : FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.remove();
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uPointer = gl.getUniformLocation(prog, "uPointer");
    const colours = PALETTES[palette];
    (["a", "b", "c", "d", "e"] as const).forEach((k) => {
      gl.uniform3fv(gl.getUniformLocation(prog, `u${k.toUpperCase()}`), colours[k]);
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let visible = true;
    let raf = 0;
    const startedAt = performance.now() - Math.random() * 40_000;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * resolution;
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    const draw = (now: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const elapsed = ((now - startedAt) / 1000) * speed;
      gl.uniform1f(uTime, TIME_SWING * Math.sin(elapsed / TIME_SWING));
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    resize();
    draw(performance.now());
    canvas.style.opacity = "1";

    const ro = new ResizeObserver(() => {
      resize();
      if (!raf) draw(performance.now());
    });
    ro.observe(canvas);

    const root = (canvas.closest("[data-flow-root]") as HTMLElement | null) ?? canvas.parentElement ?? canvas;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduceMotion) raf = requestAnimationFrame(loop);
    });
    io.observe(root);

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = 1 - e.clientY / window.innerHeight;
    };
    if (interactive && !reduceMotion) window.addEventListener("pointermove", onPointer, { passive: true });
    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [palette, resolution, speed, interactive, mode]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ background: mode === "liquid" ? LIQUID_FALLBACK : FALLBACK[palette] }}
    />
  );
}
