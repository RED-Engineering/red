import { ImageResponse } from "next/og";

export const alt = "RED — mechanical parts for any manufacturing process.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0D0D0C",
          color: "#F1EEE6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#FF3131", fontSize: 18, letterSpacing: 6 }}>ANY PROCESS / MECHANICAL</span>
          <span style={{ color: "#817D74", fontSize: 18, letterSpacing: 6 }}>RED / 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#817D74", fontSize: 22, letterSpacing: 1, marginBottom: 18 }}>
            Mechanical parts for sheet metal, machining, welding, and the process the part needs.
          </span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 68, letterSpacing: -2, lineHeight: 0.9 }}>
            <span>ENGINEERING</span>
            <span>THAT FEELS</span>
            <span>HUMAN.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
