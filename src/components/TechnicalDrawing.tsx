import type { DrawingId } from "@/content/types";

type Props = {
  id: DrawingId;
  className?: string;
  explode?: boolean;
  light?: boolean;
};

const stroke = "#F4F4F2";
const dim = "#7A7A7A";
const accent = "#FF3131";

function Control({ explode = false }: { explode?: boolean }) {
  const lift = explode ? 28 : 0;
  return (
    <g>
      <g opacity={0.9} transform={`translate(0 ${-lift})`}>
        <rect x="210" y="150" width="380" height="168" rx="2" fill="#161616" stroke={stroke} strokeWidth="1.2" />
        <rect x="232" y="172" width="336" height="92" fill="#0F0F0F" stroke={stroke} strokeWidth="0.8" />
        <circle cx="290" cy="218" r="28" fill="none" stroke={stroke} strokeWidth="1.4" />
        <circle cx="290" cy="218" r="8" fill={accent} />
        <rect x="360" y="200" width="180" height="36" fill="none" stroke={stroke} strokeWidth="1.2" />
        <rect x="372" y="210" width="48" height="16" fill={stroke} opacity="0.85" />
        <path d="M210 318 L248 348 H552 L590 318" fill="#121212" stroke={stroke} strokeWidth="1" />
      </g>
      <g transform={`translate(0 ${lift * 0.4})`}>
        <path d="M250 348 L268 430 H360 L342 348" fill="#141414" stroke={stroke} strokeWidth="1" />
        <path d="M440 348 L458 430 H550 L532 348" fill="#141414" stroke={stroke} strokeWidth="1" />
        <circle cx="314" cy="390" r="6" fill="none" stroke={accent} strokeWidth="1" />
        <circle cx="496" cy="390" r="6" fill="none" stroke={accent} strokeWidth="1" />
      </g>
      <g stroke={dim} strokeWidth="0.8" fill="none">
        <path d="M210 128 H590" />
        <path d="M210 122 V134" />
        <path d="M590 122 V134" />
      </g>
      <text x="400" y="118" textAnchor="middle" fill={dim} fontSize="11" fontFamily="ui-monospace, monospace">
        148 mm
      </text>
      <g stroke={dim} strokeWidth="0.8" fill="none">
        <path d="M186 150 V318" />
        <path d="M180 150 H192" />
        <path d="M180 318 H192" />
      </g>
      <text
        x="168"
        y="240"
        fill={dim}
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        transform="rotate(-90 168 240)"
      >
        72 mm
      </text>
    </g>
  );
}

function Mount() {
  return (
    <g>
      <rect x="140" y="300" width="220" height="16" fill="#1A1A1A" stroke={stroke} strokeWidth="1" />
      <path d="M168 300 V214 H214 V300" fill="#141414" stroke={stroke} strokeWidth="1.1" />
      <rect x="176" y="318" width="56" height="70" fill="#121212" stroke={stroke} strokeWidth="1" />
      <circle cx="204" cy="370" r="8" fill="none" stroke={accent} strokeWidth="1.2" />
      <path d="M214 230 H430" stroke={stroke} strokeWidth="8" strokeLinecap="square" />
      <circle cx="430" cy="230" r="16" fill="none" stroke={stroke} strokeWidth="1.4" />
      <path d="M430 246 V340" stroke={stroke} strokeWidth="6" />
      <rect x="404" y="340" width="52" height="36" fill="#161616" stroke={stroke} strokeWidth="1" />
      <g stroke={dim} strokeWidth="0.8" fill="none">
        <path d="M214 196 H430" />
        <path d="M214 190 V202" />
        <path d="M430 190 V202" />
      </g>
      <text x="322" y="186" textAnchor="middle" fill={dim} fontSize="11" fontFamily="ui-monospace, monospace">
        420 mm
      </text>
    </g>
  );
}

function Fixture() {
  return (
    <g>
      <rect x="180" y="140" width="440" height="280" fill="#141414" stroke={stroke} strokeWidth="1.2" />
      {[0, 1, 2, 3, 4, 5].map((x) =>
        [0, 1, 2, 3].map((y) => (
          <circle
            key={`${x}-${y}`}
            cx={220 + x * 64}
            cy={180 + y * 60}
            r="4"
            fill="none"
            stroke={x === 0 && y === 0 ? accent : dim}
            strokeWidth="0.9"
          />
        )),
      )}
      <rect x="470" y="168" width="96" height="28" fill="#1A1A1A" stroke={stroke} strokeWidth="1" />
      <rect x="470" y="348" width="96" height="28" fill="#1A1A1A" stroke={stroke} strokeWidth="1" />
      <g stroke={dim} strokeWidth="0.8" fill="none">
        <path d="M180 436 H620" />
        <path d="M180 430 V442" />
        <path d="M620 430 V442" />
      </g>
      <text x="400" y="458" textAnchor="middle" fill={dim} fontSize="11" fontFamily="ui-monospace, monospace">
        200 mm
      </text>
    </g>
  );
}

function Hinge() {
  return (
    <g>
      <path d="M220 250 H370 V310 H220 Z" fill="#151515" stroke={stroke} strokeWidth="1.2" />
      <path d="M430 250 H580 V310 H430 Z" fill="#151515" stroke={stroke} strokeWidth="1.2" />
      <rect x="350" y="228" width="100" height="104" rx="2" fill="#101010" stroke={stroke} strokeWidth="1.2" />
      <circle cx="400" cy="280" r="22" fill="none" stroke={stroke} strokeWidth="1.4" />
      <circle cx="400" cy="280" r="8" fill="none" stroke={accent} strokeWidth="1.3" />
      <g stroke={dim} strokeWidth="0.8" fill="none">
        <path d="M400 190 V228" />
        <path d="M392 198 H408" />
      </g>
      <text x="414" y="204" fill={dim} fontSize="11" fontFamily="ui-monospace, monospace">
        Ø 6
      </text>
      <path d="M370 280 H430" stroke={accent} strokeWidth="0.7" strokeDasharray="3 4" />
    </g>
  );
}

export function TechnicalDrawing({ id, className, explode }: Props) {
  return (
    <svg
      viewBox="0 0 800 520"
      className={className}
      role="img"
      aria-label={`Technical drawing: ${id}`}
    >
      <rect width="800" height="520" fill="#0B0B0B" />
      {id === "control" && <Control explode={explode} />}
      {id === "mount" && <Mount />}
      {id === "fixture" && <Fixture />}
      {id === "hinge" && <Hinge />}
    </svg>
  );
}
