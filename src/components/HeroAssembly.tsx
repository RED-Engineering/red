"use client";

import type { CSSProperties, ReactNode } from "react";

const STROKE = "#F1EEE6";
const TOP = "#6e6c64";
const SIDE = "#3c3b36";
const DARK = "#22211e";
const VOID = "#171715";
const ACCENT = "#FF3131";

const BASE = { x: -124, y: -82, w: 248, d: 164, h: 14, z: 0, k: 14 };
const CAP = { x: -76, y: -50, w: 152, d: 100, h: 12, z: BASE.h, k: 10 };
const POST_R = 18;
const POST_H = 34;
const SCREWS = [
  { x: -44, y: 8 },
  { x: 44, y: 8 },
] as const;

function iso(x: number, y: number, z: number) {
  return [340 + (x - y) * 0.98, 340 + (x + y) * 0.5 - z] as const;
}

function pt(p: readonly [number, number]) {
  return `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
}

function topRing(x: number, y: number, z: number, w: number, d: number, h: number, k: number) {
  const zz = z + h;
  return [
    iso(x + k, y, zz),
    iso(x + w - k, y, zz),
    iso(x + w, y + k, zz),
    iso(x + w, y + d - k, zz),
    iso(x + w - k, y + d, zz),
    iso(x + k, y + d, zz),
    iso(x, y + d - k, zz),
    iso(x, y + k, zz),
  ];
}

function Hole({ x, y, z, r }: { x: number; y: number; z: number; r: number }) {
  const c = iso(x, y, z);
  return (
    <ellipse cx={c[0]} cy={c[1]} rx={r * 0.98} ry={r * 0.5} fill={VOID} stroke={STROKE} strokeWidth="1.15" pathLength={100} />
  );
}

function Plate({
  spec,
  holes,
  shadow = false,
}: {
  spec: { x: number; y: number; w: number; d: number; h: number; z: number; k: number };
  holes: readonly (readonly [number, number, number])[];
  shadow?: boolean;
}) {
  const { x, y, w, d, h, z, k } = spec;
  const ring = topRing(x, y, z, w, d, h, k);
  const east = [
    iso(x + w, y + k, z),
    iso(x + w, y + d - k, z),
    iso(x + w, y + d - k, z + h),
    iso(x + w, y + k, z + h),
  ];
  const south = [
    iso(x + w - k, y + d, z),
    iso(x + k, y + d, z),
    iso(x + k, y + d, z + h),
    iso(x + w - k, y + d, z + h),
  ];

  return (
    <g stroke={STROKE} strokeWidth="1.2" strokeLinejoin="round">
      {shadow ? (
        <g className="assembly-shadow" transform={`translate(${iso(0, 0, 0)[0]} ${iso(0, 0, 0)[1] + 6})`}>
          <ellipse
            cx="0"
            cy="0"
            rx="132"
            ry="88"
            fill="rgba(0,0,0,0.55)"
            stroke="none"
            filter="url(#ground-shade)"
            transform="matrix(0.98 0.5 -0.98 0.5 0 0)"
          />
        </g>
      ) : null}
      <polygon points={ring.map(pt).join(" ")} fill="none" pathLength={100} />
      <polygon points={east.map(pt).join(" ")} fill={SIDE} pathLength={100} />
      <polygon points={south.map(pt).join(" ")} fill={DARK} pathLength={100} />
      <polygon points={ring.map(pt).join(" ")} fill={TOP} pathLength={100} />
      {holes.map(([hx, hy, r]) => (
        <Hole key={`${hx}-${hy}`} x={hx} y={hy} z={z + h} r={r} />
      ))}
    </g>
  );
}

function Post() {
  const z = CAP.z + CAP.h - 8;
  const top = iso(0, 0, z + POST_H);
  const bot = iso(0, 0, z);
  const rx = POST_R * 0.98;
  const ry = POST_R * 0.5;
  const bore = 8;
  return (
    <g stroke={STROKE} strokeWidth="1.15">
      <path
        pathLength={100}
        d={`M ${bot[0] - rx} ${bot[1]} L ${top[0] - rx} ${top[1]} A ${rx} ${ry} 0 0 1 ${top[0] + rx} ${top[1]} L ${bot[0] + rx} ${bot[1]} A ${rx} ${ry} 0 0 1 ${bot[0] - rx} ${bot[1]} Z`}
        fill={SIDE}
      />
      <ellipse cx={top[0]} cy={top[1]} rx={rx} ry={ry} fill="#7a7870" pathLength={100} />
      <ellipse cx={top[0]} cy={top[1]} rx={bore * 0.98} ry={bore * 0.5} fill={VOID} stroke={STROKE} strokeWidth="1.1" pathLength={100} />
    </g>
  );
}

function Screw({ x, y }: { x: number; y: number }) {
  const seat = CAP.z + CAP.h;
  const top = iso(x, y, seat + 2);
  const bot = iso(x, y, seat);
  const head = iso(x, y, seat + 6);
  const thread = iso(x, y, seat + 1);
  const rx = 5.4;
  const ry = 2.7;
  return (
    <g stroke={STROKE} strokeWidth="1.15">
      <path
        pathLength={100}
        d={`M ${bot[0] - rx} ${bot[1]} L ${top[0] - rx} ${top[1]} A ${rx} ${ry} 0 0 1 ${top[0] + rx} ${top[1]} L ${bot[0] + rx} ${bot[1]} A ${rx} ${ry} 0 0 1 ${bot[0] - rx} ${bot[1]} Z`}
        fill="#2a2926"
      />
      <ellipse cx={thread[0]} cy={thread[1]} rx={rx + 0.6} ry={ry + 0.3} fill="none" stroke={STROKE} strokeWidth="0.8" pathLength={100} />
      <ellipse cx={head[0]} cy={head[1]} rx={13} ry={6.6} fill={ACCENT} stroke={ACCENT} pathLength={100} />
      <line
        x1={head[0] - 7}
        y1={head[1]}
        x2={head[0] + 7}
        y2={head[1]}
        stroke="#3a0808"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={100}
      />
    </g>
  );
}

function Part({
  index,
  from,
  children,
}: {
  index: number;
  from: readonly [number, number];
  children: ReactNode;
}) {
  return (
    <g
      className={`assembly-move assembly-move-${index}`}
      style={{ "--fx": `${from[0]}px`, "--fy": `${from[1]}px` } as CSSProperties}
    >
      <g className={`assembly-trace assembly-trace-${index}`}>{children}</g>
      <g className={`assembly-solid assembly-solid-${index}`}>{children}</g>
    </g>
  );
}

const baseHoles = [
  [BASE.x + 26, BASE.y + 26, 7],
  [BASE.x + BASE.w - 26, BASE.y + 26, 7],
  [BASE.x + 26, BASE.y + BASE.d - 26, 7],
  [BASE.x + BASE.w - 26, BASE.y + BASE.d - 26, 7],
  [0, 0, 12],
  ...SCREWS.map((screw) => [screw.x, screw.y, 7] as const),
] as const;

const capHoles = [
  [0, 0, 22],
  ...SCREWS.map((screw) => [screw.x, screw.y, 7] as const),
] as const;

export function HeroAssembly() {
  return (
    <svg viewBox="96 188 488 300" className="h-full w-full" role="img" aria-label="Plates, post, and screws assembling">
      <defs>
        <filter id="ground-shade" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <Part index={0} from={[0, 64]}>
        <Plate spec={BASE} holes={baseHoles} shadow />
      </Part>
      <Part index={1} from={[130, -28]}>
        <Plate spec={CAP} holes={capHoles} />
      </Part>
      <Part index={2} from={[0, -150]}>
        <Post />
      </Part>
      <Part index={3} from={[0, -150]}>
        <Screw x={SCREWS[0].x} y={SCREWS[0].y} />
      </Part>
      <Part index={4} from={[0, -186]}>
        <Screw x={SCREWS[1].x} y={SCREWS[1].y} />
      </Part>
    </svg>
  );
}
