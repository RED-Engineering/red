import { ImageResponse } from "next/og";

export const alt = "RED — Engineering, design and manufacturing.";
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
          <span style={{ color: "#FF3131", fontSize: 18, letterSpacing: 6 }}>ENGINEERING / DESIGN</span>
          <span style={{ color: "#817D74", fontSize: 18, letterSpacing: 6 }}>RED / 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 80, letterSpacing: -2 }}>
          <span>ENGINEERED</span>
          <span>TO EXIST.</span>
        </div>
      </div>
    ),
    size,
  );
}
