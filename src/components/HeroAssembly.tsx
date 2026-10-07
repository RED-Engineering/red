"use client";

import type { CSSProperties, ReactNode } from "react";

const STROKE = "#F1EEE6";
const TOP = "#6e6c64";
const SIDE = "#3c3b36";
const DARK = "#22211e";
const VOID = "#171715";
const RED = "#FF3131";
const RED_SIDE = "#d61e1e";
const RED_DARK = "#8e1212";
const BLOCK_TOP = "#86847c";

const BASE = { x: -126, y: -74, w: 252, d: 148, h: 14, z: 0, k: 14 };
const BLOCK = { w: 44, d: 36, h: 40, k: 5 };
const SEATS = [-66, 66] as const;
const CAP = {
  x: -108,
  y: -32,
  w: 216,
  d: 64,
  h: 12,
  z: BASE.h + BLOCK.h,
  k: 8,
};

type PlateSpec = { x: number; y: number; w: number; d: number; h: number; z: number; k: number };
type Tone = { top: string; east: string; south: string };

const STEEL: Tone = { top: TOP, east: SIDE, south: DARK };
const SPACER: Tone = { top: BLOCK_TOP, east: "#4e4c47", south: "#2c2b28" };
const ANODIZED: Tone = { top: RED, east: RED_SIDE, south: RED_DARK };

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

function blockSpec(cx: number): PlateSpec {
  return {
    x: cx - BLOCK.w / 2,
    y: -BLOCK.d / 2,
    w: BLOCK.w,
    d: BLOCK.d,
    h: BLOCK.h,
    z: BASE.h,
    k: BLOCK.k,
  };
}

function Hole({ x, y, z, r }: { x: number; y: number; z: number; r: number }) {
  const c = iso(x, y, z);
  return (
    <ellipse
      cx={c[0]}
      cy={c[1]}
      rx={r * 0.98}
      ry={r * 0.5}
      fill={VOID}
      stroke={STROKE}
      strokeWidth="1.15"
      pathLength={100}
    />
  );
}

function Plate({
  spec,
  holes = [],
  tone = STEEL,
  shadow = false,
}: {
  spec: PlateSpec;
  holes?: readonly (readonly [number, number, number])[];
  tone?: Tone;
  shadow?: boolean;
}) {
  const { x, y, w, d, h, z, k } = spec;
  const ring = topRing(x, y, z, w, d, h, k);
  const wall = (ax: number, ay: number, bx: number, by: number) => [
    iso(ax, ay, z),
    iso(bx, by, z),
    iso(bx, by, z + h),
    iso(ax, ay, z + h),
  ];
  const east = wall(x + w, y + k, x + w, y + d - k);
  const south = wall(x + w - k, y + d, x + k, y + d);
  const frontRight = wall(x + w, y + d - k, x + w - k, y + d);
  const frontLeft = wall(x + k, y + d, x, y + d - k);
  const backRight = wall(x + w - k, y, x + w, y + k);

  return (
    <g stroke={STROKE} strokeWidth="1.2" strokeLinejoin="round">
      {shadow ? (
        <g className="assembly-shadow" transform={`translate(${iso(0, 0, 0)[0]} ${iso(0, 0, 0)[1] + 8})`}>
          <ellipse
            cx="0"
            cy="0"
            rx="148"
            ry="92"
            fill="rgba(0,0,0,0.5)"
            stroke="none"
            filter="url(#ground-shade)"
            transform="matrix(0.98 0.5 -0.98 0.5 0 0)"
          />
        </g>
      ) : null}
      <polygon points={backRight.map(pt).join(" ")} fill={tone.east} pathLength={100} />
      <polygon points={east.map(pt).join(" ")} fill={tone.east} pathLength={100} />
      <polygon points={frontRight.map(pt).join(" ")} fill={tone.south} pathLength={100} />
      <polygon points={south.map(pt).join(" ")} fill={tone.south} pathLength={100} />
      <polygon points={frontLeft.map(pt).join(" ")} fill={tone.south} pathLength={100} />
      <polygon points={ring.map(pt).join(" ")} fill={tone.top} pathLength={100} />
      {holes.map(([hx, hy, r]) => (
        <Hole key={`${hx}-${hy}`} x={hx} y={hy} z={z + h} r={r} />
      ))}
    </g>
  );
}

function Footprint({ cx }: { cx: number }) {
  const spec = blockSpec(cx);
  const ring = topRing(spec.x, spec.y, BASE.h, spec.w, spec.d, 0, spec.k);
  return (
    <polygon
      points={ring.map(pt).join(" ")}
      fill="none"
      stroke={STROKE}
      strokeWidth="1.05"
      pathLength={100}
    />
  );
}

function Screw({ x, y }: { x: number; y: number }) {
  const seat = CAP.z + CAP.h;
  const headH = 7;
  const headR = 11;
  const top = iso(x, y, seat + headH);
  const bot = iso(x, y, seat);
  const rx = headR * 0.98;
  const ry = headR * 0.5;
  const socket = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return iso(x + Math.cos(a) * 4.2, y + Math.sin(a) * 4.2, seat + headH);
  });

  return (
    <g stroke={STROKE} strokeWidth="1.1" strokeLinejoin="round">
      <path
        pathLength={100}
        d={`M ${bot[0] - rx} ${bot[1]} L ${top[0] - rx} ${top[1]} A ${rx} ${ry} 0 0 1 ${top[0] + rx} ${top[1]} L ${bot[0] + rx} ${bot[1]} A ${rx} ${ry} 0 0 1 ${bot[0] - rx} ${bot[1]} Z`}
        fill="#2a2926"
      />
      <ellipse cx={top[0]} cy={top[1]} rx={rx} ry={ry} fill="#3f3e39" pathLength={100} />
      <polygon points={socket.map(pt).join(" ")} fill={VOID} pathLength={100} />
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

const cornerHoles = [
  [BASE.x + 30, BASE.y + 30, 6.5],
  [BASE.x + BASE.w - 30, BASE.y + 30, 6.5],
  [BASE.x + 30, BASE.y + BASE.d - 30, 6.5],
  [BASE.x + BASE.w - 30, BASE.y + BASE.d - 30, 6.5],
] as const;

const capHoles = SEATS.map((x) => [x, 0, 7] as const);

export function HeroAssembly() {
  return (
    <svg
      viewBox="80 176 520 320"
      className="h-full w-full"
      role="img"
      aria-label="Base plate, two blocks, a red cap, and two screws assembling into a fixture"
    >
      <defs>
        <filter id="ground-shade" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <Part index={0} from={[0, 68]}>
        <Plate spec={BASE} holes={cornerHoles} shadow />
        {SEATS.map((cx) => (
          <Footprint key={cx} cx={cx} />
        ))}
      </Part>
      <Part index={1} from={[-150, -24]}>
        <Plate spec={blockSpec(SEATS[0])} holes={[[SEATS[0], 0, 6]]} tone={SPACER} />
      </Part>
      <Part index={2} from={[150, -24]}>
        <Plate spec={blockSpec(SEATS[1])} holes={[[SEATS[1], 0, 6]]} tone={SPACER} />
      </Part>
      <Part index={3} from={[0, -150]}>
        <Plate spec={CAP} holes={capHoles} tone={ANODIZED} />
      </Part>
      <Part index={4} from={[0, -188]}>
        <Screw x={SEATS[0]} y={0} />
        <Screw x={SEATS[1]} y={0} />
      </Part>
    </svg>
  );
}
